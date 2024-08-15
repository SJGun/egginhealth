package com.egginhealth.controller;


import com.egginhealth.data.dto.OcrDto;
import com.egginhealth.data.dto.exercise.*;
import com.egginhealth.service.ExerciseService;
import com.egginhealth.service.OcrService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final OcrService ocrService;

    @GetMapping("/{uid}")
    public ResponseEntity<ExerciseDto> getExercise(@PathVariable("uid") int uid, @RequestParam int year, @RequestParam int month, @RequestParam int day) {
        return new ResponseEntity<>(exerciseService.getExercise(uid, year, month, day), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ExerciseSetDto> postExerciseSetBy(@RequestBody ExerciseSetInputDto inputData) {
        return new ResponseEntity<>(exerciseService.saveExerciseSet(inputData), HttpStatus.CREATED);
    }

    @PutMapping("/report")
    public ResponseEntity<ExerciseReportDto> postExerciseReportBy(@ModelAttribute ExerciseReportInputDto inputData) throws IOException {

        return new ResponseEntity<>(exerciseService.saveExerciseReport(inputData), HttpStatus.CREATED);
    }

    @PostMapping("/comment")
    public ResponseEntity<Void> postExerciseCommentBy(@RequestBody ExerciseCommentDto inputData) {
        exerciseService.saveExerciseComment(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteExerciseSetBy(@RequestParam int setId) {
        boolean isDelete = exerciseService.deleteExerciseSet(setId);
        return isDelete ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping
    public ResponseEntity<ExerciseSetDto> patchExerciseSetBy(@RequestBody ExerciseSetDto inputData) {
        return new ResponseEntity<>(exerciseService.updateExerciseSet(inputData), HttpStatus.CREATED);
    }

    @DeleteMapping("/report")
    public ResponseEntity<Void> deleteExerciseReportBy(@RequestParam int id) {
        boolean isDelete = exerciseService.deleteExerciseReport(id);
        return isDelete ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/ocr")
    public ResponseEntity<String> getOcrResult(@ModelAttribute OcrDto ocrDto) {


        return new ResponseEntity<>(ocrService.getOcrResult(ocrDto), HttpStatus.OK);
    }
}
