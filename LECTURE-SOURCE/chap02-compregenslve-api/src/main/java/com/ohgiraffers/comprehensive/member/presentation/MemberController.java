package com.ohgiraffers.comprehensive.member.presentation;

import com.ohgiraffers.comprehensive.member.dto.request.MemberSignupRequest;
import com.ohgiraffers.comprehensive.member.dto.response.ProfileResponse;
import com.ohgiraffers.comprehensive.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping({"/member", "/api/v1/member"})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /* 1. 회원 가입 */
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Valid MemberSignupRequest memberRequest) {

        memberService.signup(memberRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 2. 프로필 조회
    @GetMapping //이게 위의 적어논 "/api/v1/member" 가 왔을때 동작함
    public ResponseEntity<ProfileResponse> profile(@AuthenticationPrincipal User user){ //ProfileResponse를 반환 데이터로 삼음

        ProfileResponse profileResponse = memberService.getProfile(user.getUsername());

        return ResponseEntity.ok(profileResponse);
    }







}