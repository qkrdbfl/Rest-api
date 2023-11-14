package com.ohgiraffers.comprehensive.product.dto.response;

import com.ohgiraffers.comprehensive.product.domain.Product;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter //이거 안써서 500에러 낫었음 ㅠㅠ
@RequiredArgsConstructor( access = AccessLevel.PACKAGE) //final 이라고 정의 했을땐 이 어노테이션을 쓰면 필요한걸 가지게 됨
public class CustomerProductsResponse {

    private final Long productCode;
    private final String productName;
    private final Long productPrice;
    private final String productImageUrl;

    public static CustomerProductsResponse from (final Product product){ //필요한 값만 쓸수 있게 가져온것
        return new CustomerProductsResponse(
                product.getProductCode(),
                product.getProductName(),
                product.getProductPrice(),
                product.getProductImageUrl()
        );
    }


}
