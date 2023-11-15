package com.ohgiraffers.comprehensive.login.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ohgiraffers.comprehensive.common.exception.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.ohgiraffers.comprehensive.common.exception.type.ExceptionCode.FAIL_LOGIN;

// 로그인 실패 처리 핸들러
@RequiredArgsConstructor
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final ObjectMapper objectMapper;

    @Override //실패시 나올 메소드 자동으로 생성되지 않아 우클릭하여 생성해줌
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("동작확인");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(new ExceptionResponse(FAIL_LOGIN)));
    }


}
