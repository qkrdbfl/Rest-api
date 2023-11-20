package com.ohgiraffers.comprehensive.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ExceptionHandingController {

    //400 : Bad Request(요청값이 달라서, 파리미터 잘못 보내서 ..등등)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> badRequestException(BadRequestException e) {

        final ExceptionResponse exceptionResponse
                = ExceptionResponse.of(e.getCode(), e.getMessage());

        return ResponseEntity.badRequest().body(exceptionResponse);
    }

    //401 : UnAuthorized 인증오류 => 이미 처리 되어 있음

    //403 : Forbidden 인가 오류 => 이미 처리 되어 있음

    //404 : Not Found
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> notFoundException(NotFoundException e) {

        final ExceptionResponse exceptionResponse
                = ExceptionResponse.of(e.getCode(), e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponse);
    }

    //409 : Conflict(충돌) => 요청, 인증, 인가, 답도 찾아지지만 논리적으로 해당 기능을 수행하면 안될 경우 처리
    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ExceptionResponse> conflictException(ConflictException e) {

        final ExceptionResponse exceptionResponse
                = ExceptionResponse.of(e.getCode(), e.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionResponse);
    }

    //500 : 서버 내부 오류 Server Errors
    @ExceptionHandler(ServerInternalException.class)
    public ResponseEntity<ExceptionResponse> serverInternalException(ServerInternalException e) {

        final ExceptionResponse exceptionResponse
                = ExceptionResponse.of(e.getCode(), e.getMessage());

        return ResponseEntity.internalServerError().body(exceptionResponse);
    }

    // Validotion Exception
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> methodValidException(MethodArgumentNotValidException e) {

        String defaultMessage = e.getBindingResult().getFieldError().getDefaultMessage();

        final ExceptionResponse exceptionResponse
                = ExceptionResponse.of(9000, defaultMessage);

        return ResponseEntity.badRequest().body(exceptionResponse);
    }
}
