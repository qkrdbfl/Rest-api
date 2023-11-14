package com.ohgiraffers.restapi.section04.hateoas;

import com.ohgiraffers.restapi.section02.responseentity.ResponseMessage;
import com.ohgiraffers.restapi.section02.responseentity.UserDTO;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/hateoas")
public class HateoasTestController {

    private List<UserDTO> users;
    public HateoasTestController() {
        users = new ArrayList<>();
        users.add(new UserDTO(1, "user01", "pass01", "홍길동", new Date()));
        users.add(new UserDTO(2, "user02", "pass02", "유관순", new Date()));
        users.add(new UserDTO(3, "user03", "pass03", "이순신", new Date()));
    }

    //회원 조회 방법 1
    @GetMapping("/users")
    public ResponseEntity<ResponseMessage> findAllUsers() { //ResponseMessage 을 반환타입으로 지정
        //응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        //hateoas 설정  //추가함
        List<EntityModel<UserDTO>> userWithRel =
        users.stream().map(user -> EntityModel.of(user,
                linkTo(methodOn(HateoasTestController.class).findUserByNo(user.getNo())).withSelfRel(),
                linkTo(methodOn(HateoasTestController.class).findAllUsers()).withRel("users")
                )).collect(Collectors.toList());

        // 응답 데이터 설정
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("users", userWithRel);
        ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK); //생성자를 활용해서 처리(밑과 같음 방법만 다름)
    }

    //회원 조회 방법 2
    @GetMapping("/users/{userNo}") //아래줄의 userNo 랑 {}안에 있는 이름이랑 같아야함
    public ResponseEntity<ResponseMessage> findUserByNo(@PathVariable int userNo) { //*이건 디비연동이 안됐을때 쓰는 로직임 (일치하는걸 찾아옴)
        //응답 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        UserDTO foundUser = users
                .stream()
                .filter(user -> user.getNo() == userNo)
                .collect(Collectors.toList()).get(0);

        // 응답 데이터 설정
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("user", foundUser);
        ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);

        return ResponseEntity //메소드를 이용해서 처리(위와 같음 방법만 다름)
                .ok()
                .headers(headers)
                .body(responseMessage);
    }

}
