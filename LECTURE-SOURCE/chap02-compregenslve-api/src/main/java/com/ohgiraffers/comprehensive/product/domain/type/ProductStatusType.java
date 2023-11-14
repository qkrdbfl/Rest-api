package com.ohgiraffers.comprehensive.product.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProductStatusType {

    USABLE("usable"),
    DISABLE("disable"),
    DELETED("deleted");

    private final String value; //value 선언

    ProductStatusType(String value) {this.value = value;}

    @JsonCreator
    public static ProductStatusType from(String value){
        for (ProductStatusType status : ProductStatusType.values()){
            if (status.getValue().equals(value)){
                return status;
            }
        }
        return null;
    }

    @JsonValue // 이거 뭐냐..
    public String getValue() {return value;}
}
