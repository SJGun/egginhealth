package com.egginhealth.service;

import com.egginhealth.data.dto.comment.CommentDto;
import com.egginhealth.data.dto.exercise.ExerciseCommentDto;
import com.egginhealth.data.dto.exercise.ExerciseDto;
import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.data.dto.exercise.ExerciseSetDto;
import com.egginhealth.data.entity.Comment;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseHomework;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import com.egginhealth.data.entity.exercise.ExerciseSet;
import com.egginhealth.data.repository.CommentRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.exercise.ExerciseHomeworkRepository;
import com.egginhealth.data.repository.exercise.ExerciseReportRepository;
import com.egginhealth.data.repository.exercise.ExerciseSetRepository;
import com.egginhealth.util.DateTimeUtil;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseService {

    private static final String DIR_NAME = "exercise";

    private final ExerciseSetRepository exerciseSetRepository;
    private final ExerciseHomeworkRepository exerciseHomeworkRepository;
    private final ExerciseReportRepository exerciseReportRepository;
    private final S3Service s3Service;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;


    public ExerciseDto getExercise(int uid, int year, int month, int day) {
        Member member = memberRepository.findById(uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndDate(uid, year, month, day).get();
        List<ExerciseSetDto> sets = homework.getExerciseSetList().stream().map(ExerciseSetDto::from).toList();
        List<CommentDto> comment = commentRepository.findByBoardIdAndBoardType(homework.getId(), "E").stream().map(CommentDto::from).toList();
        ExerciseReport report = exerciseReportRepository.findByMemberIdAndDate(uid, year, month, day).get();

        return ExerciseDto.from(homework, member, sets, comment, report);
    }

    public void saveExerciseSet(ExerciseSetDto exerciseSetDto) {

        int memberId = SecurityUtil.getUserId();
        LocalDateTime date = DateTimeUtil.getStringToDateTime(exerciseSetDto.date());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndLocalDate(memberId, date).orElseGet(() -> {
            ExerciseHomework newExerciseHomework = ExerciseHomework.createExerciseHomework(member);
            return exerciseHomeworkRepository.save(newExerciseHomework);
        });

        exerciseSetRepository.save(ExerciseSet.createExerciseSet(exerciseSetDto, homework));

    }

    public void saveExerciseReport(ExerciseReportInputDto exerciseReportInputDto) throws IOException {

        String url = s3Service.upload(exerciseReportInputDto.image(), DIR_NAME);
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        exerciseReportRepository.save(ExerciseReport.createExerciseReport(member, url, exerciseReportInputDto.date()));
    }

    public void saveExerciseComment(ExerciseCommentDto exerciseCommentDto) {

        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        commentRepository.save(Comment.createComment(exerciseCommentDto, member));

    }


}