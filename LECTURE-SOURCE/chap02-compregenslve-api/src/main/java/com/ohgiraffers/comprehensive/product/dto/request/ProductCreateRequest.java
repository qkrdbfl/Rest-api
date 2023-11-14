package com.ohgiraffers.comprehensive.product.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.lang.reflect.Field;

@RequiredArgsConstructor
@Getter
public class ProductCreateRequest {

    @NotBlank
    private final String productName;
    @Min(value = 1)
    private final Long productPrice;
    @NotBlank
    private final String productDescription;
    @Min(value = 1)
    private final Long categoryCode;
    @Min(value = 1) // 1이상의 값이 들어와야 한다
    private final Long productStock;
}
