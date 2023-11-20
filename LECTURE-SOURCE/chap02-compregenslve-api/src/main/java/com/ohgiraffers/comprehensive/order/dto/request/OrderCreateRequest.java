package com.ohgiraffers.comprehensive.order.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@RequiredArgsConstructor
@Getter
public class OrderCreateRequest {

    @Min(value = 1)
    public final Long productCode;
    @NotBlank
    public final String orderPhone;
    @NotBlank
    public final String orderEmail;
    @NotBlank
    public final String orderReceiver;
    @NotBlank
    public final String orderAddress;
    @Min(value = 1)
    public final Long orderAmount;
}
