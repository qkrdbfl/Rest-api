package com.ohgiraffers.restapi.section03.valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/valid")
public class ValidTestController {

    @GetMapping("/users/{userNo}")
    public ResponseEntity<Void> findUserByNo() throws UserNotFoundException {

        //UserNotFoundException을 일부러 나오게 해봄
        boolean check = true;
        if (check) {
            throw new UserNotFoundException("회원 정보를 찾을 수 없습니다.");
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/users")
    public ResponseEntity<Void> registUser(@Validated @RequestBody UserDTO user) { //@Validated : 유효성 검사 하고 싶은곳에 붙일수 있음

        return ResponseEntity
                .created(URI.create("/valid/user/1"))
                .build();
    }
}
