package com.ohgiraffers.comprehensive.jwt.service;

import com.ohgiraffers.comprehensive.common.exception.BadRequestException;
import com.ohgiraffers.comprehensive.member.domain.Member;
import com.ohgiraffers.comprehensive.member.domain.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import static com.ohgiraffers.comprehensive.common.exception.type.ExceptionCode.NOT_FOUND_MEMBER_ID;

@Service
@Slf4j //로그 선언
public class JwtService {

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;
    @Value("${jwt.refresh.expiration}")
    private Long refeshTokenExpirationPeriod;

    private final Key key;
    private final MemberRepository memberRepository;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "refreshToken";

    private static final String BEARER = "Bearer "; //띄어쓰기도 넣어줘야 함 //여기 Bearer앞에 공백있어서 토큰 넣을때 구동 안됐음 ㅠㅠ

    public JwtService(@Value("${jwt.secret}") String secretKey, MemberRepository memberRepository) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.memberRepository = memberRepository;
    }

    public String createAccessToken(Map<String, String> memberInfo) {

        Claims claims = Jwts.claims().setSubject(ACCESS_TOKEN_SUBJECT);
        claims.putAll(memberInfo);

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationPeriod))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createRefreshToken() {

        return Jwts.builder()
                .setSubject(REFRESH_TOKEN_SUBJECT)
                .setExpiration(new Date(System.currentTimeMillis() + refeshTokenExpirationPeriod))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    @Transactional
    public void updateRefreshToken(String memberId, String refreshToken) {

        memberRepository.findByMemberId(memberId)
                .ifPresentOrElse(
                        member -> member.updateRefreshToken(refreshToken), //만약 있으면
                        () -> new BadRequestException(NOT_FOUND_MEMBER_ID) //만약 없으면 찾는 아이디 없다는 Exception 나오게
                );
    }

    public Optional<String> getRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Refresh-Token"))
                .filter(refreshToken -> refreshToken.startsWith(BEARER)) //펄스면 null반환 트루면 밑의 구문 동작(문자열)
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    public Optional<String> getAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader("Access-Token"))
                .filter(accessToken -> accessToken.startsWith(BEARER)) //펄스면 null반환 트루면 밑의 구문 동작(문자열)
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    public boolean isValidToken(String token) {

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            log.info("vaild");
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {

        memberRepository.findByRefreshToken(refreshToken)
                .ifPresent(member -> {
                    String reIssuedRefreshToken = reIssuedRefreshToken(member);
                    String accessToken = createAccessToken(
                            Map.of("memberId", member.getMemberId(), "memberRole", member.getMemberRole().name())
                    );
                    response.setHeader("Access-Token", accessToken);
                    response.setHeader("Refresh-Token", reIssuedRefreshToken);
                });
    }

    private String reIssuedRefreshToken(Member member) {

        String reIssuedRefreshToken = createRefreshToken();
        member.updateRefreshToken(reIssuedRefreshToken);
        memberRepository.saveAndFlush(member);
        return reIssuedRefreshToken;

    }

    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info("checkAccessTokenAndAuthentication");
        getAccessToken(request)
                .filter(this::isValidToken) //유효한지 확인
                .ifPresent(accessToken -> getMemberId(accessToken)//유효하다는 판단이 든다면 memberId 꺼냄
                        .ifPresent(memberId -> memberRepository.findByMemberId(memberId)
                                .ifPresent(this::saveAuthentication)));

        filterChain.doFilter(request, response); //다음으로 넘긴다는 이 코드 빠져서 구동이 이상했음;;
    }

    private Optional<String> getMemberId(String accessToken) {
        try {
            log.info("{}", Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody()
                    .get("memberId").toString());


            return Optional.ofNullable(
                    Jwts.parserBuilder()
                            .setSigningKey(key)
                            .build()
                            .parseClaimsJws(accessToken)
                            .getBody()
                            .get("memberId").toString()
            );
        } catch (Exception e) {
            log.error("Access Token이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    public void saveAuthentication(Member member){

        UserDetails userDetails = User.builder()
                .username(member.getMemberId())
                .password(member.getMemberPassword())
                .roles(member.getMemberRole().name())
                .build();

        log.info("userDetails: {}", userDetails);

        Authentication authentication
                =new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
