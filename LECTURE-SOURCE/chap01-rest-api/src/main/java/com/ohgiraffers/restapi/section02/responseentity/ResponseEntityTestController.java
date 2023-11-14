package com.ohgiraffers.restapi.section02.responseentity;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/entity")
public class ResponseEntityTestController {

    private List<UserDTO> users;

    public ResponseEntityTestController() {
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
        // 응답 데이터 설정
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("users", users);
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

    //회원 등록
    @PostMapping("/users")
    public ResponseEntity<?> registUser(@RequestBody UserDTO newUser) {

        System.out.println(newUser);

        int lastUserNo = users.get(users.size() - 1).getNo();
        newUser.setNo(lastUserNo + 1);
        newUser.setEnrollDate(new java.util.Date());
        users.add(newUser);

        return ResponseEntity
                .created(URI.create("/entity/users/" + users.get(users.size() - 1).getNo()))
                .build();
    }

    //회원 수정
    @PutMapping("/users/{userNo}")
    public ResponseEntity<Void> modifyUser(@PathVariable int userNo, @RequestBody UserDTO modifyInfo) {

        UserDTO foundUser = users.stream() //@PathVariable int userNo
                .filter(user -> user.getNo() == userNo)
                .collect(Collectors.toList()).get(0);

        foundUser.setId(modifyInfo.getId()); //@RequestBody UserDTO modifyInfo
        foundUser.setPwd(modifyInfo.getPwd());
        foundUser.setName(modifyInfo.getName());

        return ResponseEntity
                .created(URI.create("/entity/users/" + userNo))
                .build();
    }

    //회원 삭제
    @DeleteMapping("/users/{userNo}") //요기 방식이랑
    public ResponseEntity<Void> removeUser(@PathVariable int userNo) {

        UserDTO foundUser = users.stream()
                .filter(user -> user.getNo() == userNo)
                .collect(Collectors.toList()).get(0);

        users.remove(foundUser); //users에 있는 해당 유저를 지워달라는 의미 (일단 메모리에서만 지워짐)

        //여기 방식이 중요함
        return ResponseEntity
                .noContent()//status
                .build();
    }


}
