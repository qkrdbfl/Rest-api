package com.ohgiraffers.restapi.section03.valid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {

    private int no;

    //빈 문자열이나 공백은 가능
    @NotNull (message = "아이디는 반드시 입력 되어야 합니다.") //반드시 이 값은 존재해야한다(null이면 안된다)라는 의미의 어노테이션
    @NotBlank (message = "아이디는 공백일 수 없습니다.") //실질적인 문자가 있어야만 함!
    private String id;
    private String pwd;

    @NotNull(message = "이름은 반드시 입력 되어야 합니다.")
    @Size(min = 2, message = "이름은 2글자 이상이어야 합니다.")// min= , max=  사이즈 지정가능
    private String name;

    @Past //@Past : 지금시스템 시간보다 과거시간이 들어와야함  , @Future : 지금시스템 시간보다 미래시간이 들어와야함
    private Date enrollDate;


}
