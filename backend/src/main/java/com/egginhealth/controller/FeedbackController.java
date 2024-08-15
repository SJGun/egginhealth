package com.egginhealth.controller;

import com.egginhealth.data.dto.feedback.FeedbackDto;
import com.egginhealth.data.dto.feedback.FeedbackInputDto;
import com.egginhealth.data.dto.feedback.FeedbackInputUrlDto;
import com.egginhealth.data.dto.feedback.FeedbackUpdateDto;
import com.egginhealth.service.FeedbackService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Map<String, Integer>> register(@ModelAttribute FeedbackInputDto inputData) throws IOException {
        return new ResponseEntity<>(feedbackService.save(inputData, SecurityUtil.getUserId()), HttpStatus.CREATED);
    }


    @PostMapping("/url")
    public ResponseEntity<Void> postUrl(@RequestBody FeedbackInputUrlDto inputData) {
        feedbackService.registerFeedbackUrl(inputData);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<FeedbackDto>> getFeedbackList(@PathVariable("id") int id) {
        return new ResponseEntity<>(feedbackService.getFeedbackList(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> registerUpdate(@PathVariable("id") int id, @ModelAttribute FeedbackUpdateDto updateData) throws IOException {
        feedbackService.updateFeedback(updateData, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> registerDelete(@PathVariable("id") int id) {
        boolean isDelete = feedbackService.deleteFeedback(id);
        return isDelete ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('TRAINER')")
    @GetMapping("/read/{id}")
    public ResponseEntity<Void> readFeedback(@PathVariable("id") int id) {
        feedbackService.readFeedback(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
