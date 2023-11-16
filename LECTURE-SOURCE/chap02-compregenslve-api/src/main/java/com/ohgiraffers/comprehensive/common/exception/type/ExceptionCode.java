package com.ohgiraffers.comprehensive.common.exception.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {

    FAIL_TO_UPLOAD_FILE(1001, "파일 저장에 실패했다."),

    FAIL_TO_DELETE_FILE(1002, "파일 삭제에 실패하였습니다."),

    NOT_FOUND_PRODUCT_CODE(3000, "상품 코드에 해당하는 상품이 존재하지 않습니다."),

    NOT_FOUND_CATEGORY_CODE(3000, "상품 코드에 해당하는 상품이 존재하지 않습니다."),

    FAIL_LOGIN(4000, "로그인에 실패했습니다."),
    NOT_FOUND_MEMBER_ID(4002, "아이디에 해당하는 유저가 없습니다."),

    UNAUTHORIZED(4001, "인증 되지 않은 요청입니다."), //인증 실패
    ACCESS_DENIED(4003, "허가 되지 않은 요청입니다."); //인가 실패

    private final int code;
    private final String message;
}
