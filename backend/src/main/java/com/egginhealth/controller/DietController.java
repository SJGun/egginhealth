package com.egginhealth.controller;

import com.egginhealth.data.dto.comment.CommentInputDto;
import com.egginhealth.data.dto.diet.DietDayOutputDto;
import com.egginhealth.data.dto.diet.DietInputDto;
import com.egginhealth.service.DietService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/diet")
@RequiredArgsConstructor
public class DietController {

    private final DietService dietService;

    @PostMapping
    public ResponseEntity<Map<String, Integer>> register(@ModelAttribute DietInputDto inputData) throws IOException {
        return new ResponseEntity<>(dietService.save(inputData, SecurityUtil.getUserId()), HttpStatus.CREATED);
    }

    @PostMapping("/comment")
    public ResponseEntity<Void> registerComment(@RequestBody CommentInputDto inputData) {
        dietService.saveComment(inputData, SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> registerUpdate(@PathVariable("id") int id, @ModelAttribute DietInputDto updateData) throws IOException {
        dietService.updateDiet(updateData, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> registerDelete(@PathVariable("id") int id) {
        boolean isDelete = dietService.deleteDiet(id);
        return isDelete ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<List<DietDayOutputDto>> getDayRegister(@PathVariable("uid") int id, @RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day) {
        System.out.println(id+" "+month+" "+day+" "+year);
        return new ResponseEntity<>(dietService.getDayRegister(id, year, month, day), HttpStatus.OK);
    }

}
