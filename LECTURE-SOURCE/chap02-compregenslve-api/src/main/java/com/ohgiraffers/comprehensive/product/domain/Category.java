package com.ohgiraffers.comprehensive.product.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_category")
@NoArgsConstructor(access = PROTECTED) //(access = AccessLevel.PROTECTED)
@Getter
public class Category {

    @Id
    private Long categoryCode; //pk

    @Column(nullable = false) //이렇게 null이면 안된다는 속성을 넣고 싶거나 할때는 넣고 아니면 안써도 상관없음
    private String categoryName;
}
