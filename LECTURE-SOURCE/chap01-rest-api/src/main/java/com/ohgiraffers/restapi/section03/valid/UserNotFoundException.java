package com.ohgiraffers.restapi.section03.valid;

public class UserNotFoundException extends Exception { //사용자 정의 익셉션 만들어줌 (익셉션 상속받음)

    public  UserNotFoundException(String msg) {super(msg);}
}
