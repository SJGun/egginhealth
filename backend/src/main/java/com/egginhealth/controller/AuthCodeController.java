package com.egginhealth.controller;

import com.egginhealth.data.dto.AuthCodeDto;
import com.egginhealth.data.dto.member.MemberDetailDto;
import com.egginhealth.service.AuthCodeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/code")
@RequiredArgsConstructor
public class AuthCodeController {

    private final AuthCodeService authCodeService;

    @GetMapping
    public ResponseEntity<AuthCodeDto> getAuthCode() {
        return new ResponseEntity<>(authCodeService.getAuthCode(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MemberDetailDto> checkAuthCode(@RequestBody AuthCodeDto code) {
        return new ResponseEntity<>(authCodeService.checkAuthCode(code.authCode()), HttpStatus.OK);
    }

    @DeleteMapping("/{uid}")
    public ResponseEntity<Void> disconnectTrainerAndMember(@PathVariable("uid") int uid) {
        authCodeService.disconnectTrainer(uid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
