package com.egginhealth.service;

import com.egginhealth.data.dto.DateDto;
import com.egginhealth.data.dto.EggListDto;
import com.egginhealth.data.dto.memberstatus.MemberMonthStatusDto;
import com.egginhealth.data.dto.memberstatus.MemberStatusDto;
import com.egginhealth.data.entity.Feedback;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.MemberStatus;
import com.egginhealth.data.repository.FeedbackRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.MemberStatusRepository;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberStatusService {

    private final MemberStatusRepository memberStatusRepository;
    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;


    private MemberStatus getMemberStatus(DateDto date) {
        return memberStatusRepository.findByMemberIdAndYearAndMonthAndDay(SecurityUtil.getUserId(), date.year(), date.month(), date.day())
                .orElseGet(() -> {
                    Member member = memberRepository.findById(SecurityUtil.getUserId())
                            .orElseThrow(() -> new IllegalArgumentException("not found Member"));
                    return memberStatusRepository.save(MemberStatus.createMemberStatus(member, date));
                });
    }

    public void updateMemberExerciseStatus(DateDto date, boolean isExercise) {
        MemberStatus memberStatus = getMemberStatus(date);
        memberStatus.updateExerciseStatus(isExercise);
    }

    public void updateMemberDietStatus(DateDto date, boolean isDiet) {
        MemberStatus memberStatus = getMemberStatus(date);
        memberStatus.updateDietStatus(isDiet);
    }


    public List<MemberMonthStatusDto> getMemberStatusByMonth(int memberId, int year, int month) {
        return memberStatusRepository.findByMemberIdAndYearAndMonth(memberId, year, month).stream()
                .map(MemberMonthStatusDto::from)
                .toList();
    }

    public EggListDto getEggList(int uid, int year, int month) {
        List<MemberMonthStatusDto> memberStatus = getMemberStatusByMonth(uid, year, month);
        List<Integer> eggs = new ArrayList<>(Collections.nCopies(30, 0));

        memberStatus.forEach(status -> {
            int day = status.date().getDayOfMonth() - 1;
            if (day >= 0 && day < eggs.size() && (status.isDiet() || status.isExercise())) {
                eggs.set(day, makeRandomNumber());
            }
        });
        LocalDate today = LocalDate.now();
        LocalDate inputDate = LocalDate.of(year, month, 1).with(TemporalAdjusters.lastDayOfMonth());

        if (today.isBefore(inputDate)) {
            IntStream.range(today.getDayOfMonth(), 30).filter(i -> eggs.get(i) == 0).forEach(i -> eggs.set(i, -1));
        }
        return EggListDto.from(eggs);
    }

    public List<MemberStatusDto> getMemberStatusList(int year, int month, int day) {

        Member trainer = memberRepository.findById(SecurityUtil.getUserId()).get();
        List<Member> members = memberRepository.findMembersWithStatus(trainer.getId(), year, month, day).get();

        System.out.println(members.size());
        List<Integer> memberIds = members.stream()
                .map(Member::getId)
                .collect(Collectors.toList());
        System.out.println(year + " " + month + " " + day);
        Map<Integer, Boolean> feedbackMap = feedbackRepository.findUnreadFeedbacksByIds(memberIds).stream().collect(Collectors.toMap(
                Feedback::getId,
                feedback -> !feedback.isRead()
        ));

        return members.stream()
                .map(member -> {
                    MemberStatus status = member.getStatusList().isEmpty() ? null : member.getStatusList().get(0);
                    boolean feedback = feedbackMap.getOrDefault(member.getId(), false);
                    return MemberStatusDto.from(member, status, feedback);
                })
                .collect(Collectors.toList());
    }

    private int makeRandomNumber() {
        return ((int) (Math.random() * 30) + 1);
    }
}
