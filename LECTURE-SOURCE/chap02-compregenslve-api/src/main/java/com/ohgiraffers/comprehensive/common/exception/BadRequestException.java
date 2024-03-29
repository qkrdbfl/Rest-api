package com.ohgiraffers.comprehensive.common.exception;

import com.ohgiraffers.comprehensive.common.exception.type.ExceptionCode;
import lombok.Getter;

@Getter
public class BadRequestException extends CustomException { //RuntimeException을 상속받으면 캐치로 안감싸도 됨

    public BadRequestException(final ExceptionCode exceptionCode){
        super(exceptionCode);
    }

}
