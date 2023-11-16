package com.ohgiraffers.comprehensive.member.dto.response;

import com.ohgiraffers.comprehensive.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ProfileResponse {

    private final String memberId;
    private final String memberName;
    private final String memberEmail;

    //프로필 조회
    public static ProfileResponse from(final Member member) {
        return new ProfileResponse(
                member.getMemberId(),
                member.getMemberName(),
                member.getMemberEmail()
        );

    }
}
