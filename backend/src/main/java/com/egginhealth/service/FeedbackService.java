package com.egginhealth.service;

import com.egginhealth.data.dto.feedback.*;
import com.egginhealth.data.entity.Feedback;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.FeedbackRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.DateTimeUtil;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackService {

    private static final String DIR_NAME = "feedback";

    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;
    private final S3Service s3Service;

    public Map<String, Integer> save(FeedbackInputDto feedbackInputDto, int memberId) throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        String url = s3Service.upload(feedbackInputDto.record(), DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(feedbackInputDto.createdAt());

        Feedback feedbackData = Feedback.builder()
                .memo(feedbackInputDto.memo())
                .exerciseName(feedbackInputDto.exerciseName())
                .videoUrl(url)
                .createdAt(dateTime)
                .member(member)
                .build();

        int feedbackId = feedbackRepository.save(feedbackData).getId();
        Map<String, Integer> response = new HashMap<>();
        response.put("feedbackId", feedbackId);

        return response;
    }

    public List<FeedbackDto> getFeedbackList(int id) {
        return feedbackRepository.findByMemberId(id)
                .stream()
                .map(FeedbackDto::from)
                .toList();
    }

    public void updateFeedback(FeedbackUpdateDto feedbackUpdateDto, int id) throws IOException {
        Feedback feedback = findFeedbackOrThrow(id);
        String prevUrl = feedback.getVideoUrl();
        s3Service.delete(DIR_NAME, prevUrl);
        String url = s3Service.upload(feedbackUpdateDto.record(), DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(feedbackUpdateDto.updatedAt());

        FeedbackSetDto feedbackSetDto = FeedbackSetDto.from(feedbackUpdateDto, dateTime, url);
        feedback.updateFeedbackBy(feedbackSetDto);
    }

    public void registerFeedbackUrl(FeedbackInputUrlDto feedbackInputDto) {
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Feedback feedback = Feedback.builder()
                .videoUrl(feedbackInputDto.videoUrl())
                .memo(feedbackInputDto.memo())
                .exerciseName(feedbackInputDto.exerciseName())
                .member(member)
                .createdAt(LocalDateTime.now())
                .build();
        feedbackRepository.save(feedback);
    }

    public boolean deleteFeedback(int id) {
        Feedback feedback = findFeedbackOrThrow(id);

        s3Service.delete(DIR_NAME, feedback.getVideoUrl());
        feedbackRepository.deleteById(id);
        return true;
    }

    public void readFeedback(int id) {
        Feedback feedback = findFeedbackOrThrow(id);
        feedback.updateFeedbackRead();
    }

    private Feedback findFeedbackOrThrow(int id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("feedback not found"));
    }

}
