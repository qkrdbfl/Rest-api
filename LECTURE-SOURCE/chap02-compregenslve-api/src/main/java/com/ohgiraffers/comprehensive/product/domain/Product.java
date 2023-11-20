package com.ohgiraffers.comprehensive.product.domain;

import com.ohgiraffers.comprehensive.product.domain.type.ProductStatusType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

import static com.ohgiraffers.comprehensive.product.domain.type.ProductStatusType.USABLE;
import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_product")
@Getter
@NoArgsConstructor(access = PROTECTED) //기본 생성자 어노테이션
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE tbl_product SET status = 'DELETED' WHERE product_code = ?") //삭제하기위해 이 코드 하나 추가함
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //IDENTITY를 쓰면 오토 인트리먼트 속성으로 됨
    private Long productCode;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Long productPrice;

    @Column(nullable = false)
    private String productDescription;

    @ManyToOne(fetch = FetchType.LAZY) //(fetch = FetchType.LAZY) : 컬럼을 필요할 때만 가져올수 있게 됨(저거 없이 @ManyToOne만 있을땐 카테고리 안쓰는데 불러와졌음.)
    @JoinColumn(name = "categoryCode") //pk이름이랑 일치 시키기
    private  Category category;

    @Column(nullable = false)
    private String productImageUrl;
    @Column(nullable = false)
    private Long  productStock;

    @CreatedDate //시작 시간
    @Column(nullable = false, updatable = false) //업데이트도 못하게 제약
    private LocalDateTime createdAt;

    @LastModifiedDate //마지막 시간
    @Column(nullable = false)
    private LocalDateTime  modifiedAt;

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private ProductStatusType status = USABLE;

    public Product(String productName, Long productPrice, String productDescription, Category category, String productImageUrl, Long productStock) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.category = category;
        this.productImageUrl = productImageUrl;
        this.productStock = productStock;
    }

    public static Product of(
            final String productName, final Long productPrice, final String productDescription,
            final Category category, final String productImageUrl, final Long productStock
    ){
        return new Product(
                productName,
                productPrice,
                productDescription,
                category,
                productImageUrl,
                productStock
        );
    }

    public void updateProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public void update(String productName, Long productPrice, String productDescription,
                       Category category, Long productStock, ProductStatusType status){
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.category = category;
        this.productStock = productStock;
        this.status = status;
    }

    public void updateStock(Long orderAmount) { //재고 수정
        productStock -= orderAmount; // 현재 재고에서 주문 수량만큼 뺴는 코드
    }
}
