package com.ohgiraffers.comprehensive.product.dto.response;
import com.ohgiraffers.comprehensive.product.domain.Product;
import com.ohgiraffers.comprehensive.product.domain.type.ProductStatusType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE) // 생성자
public class AdminProductsResponse {

    private final Long productCode;
    private final String productName;
    private final Long productPrice;
    private final String categoryName;
    private final Long productStock;
    private final ProductStatusType status;


    /* ProductService에서 엔티티를 전달하면 아래의 형태로 값이 리턴 됨. */
    public static AdminProductsResponse from(final Product product) {
        return new AdminProductsResponse(
                product.getProductCode(),
                product.getProductName(),
                product.getProductPrice(),
                product.getCategory().getCategoryName(),
                product.getProductStock(),
                product.getStatus()
        );
    }
}