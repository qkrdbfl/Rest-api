package com.ohgiraffers.restapi.section01.response;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/response")
//1. bean scan  2. @RequestMapping  3. @ResponseBody 이 세가지의 의미를 다 담고 있는 어노테이션
public class ResponseRestController {

    /* 1. 문자열 응답 */
    @GetMapping("/hello")
    public String helloWorld() {return "Hello World";}

    /* 2. 기본 자료형 응답 */
    @GetMapping("random")
    public  int getRandomNumber () {return  (int)(Math.random() * 10) + 1;}

    /* 3. Object 응답 */
    @GetMapping("/message")
    public Message getMessage() {return new Message(200, "메세지를 응답합니다.");}

    /* 4. List 응답 */
    @GetMapping("/list")
    public List<String> getList() {return List.of(new String[]{"사과", "복숭아", "배"});}

    /* 5. Map 응답 */
    @GetMapping("/map")
    public Map<Integer, String> getMap(){

        List<Message> messagesList = new ArrayList<>();
        messagesList.add(new Message(200, "정상 응답")); //키 : 200  벨류 : "정상 응답"
        messagesList.add(new Message(404, "페이지를 찾을 수 없습니다!"));
        messagesList.add(new Message(500, "내 잘못 입니다."));
        // 스트림으로 만들어서 맵의 형태로 (키(Message::getHttpStatusCode)와 벨류(Message::getMessage) 정하기) 보냄
        return messagesList.stream().collect(Collectors.toMap(Message::getHttpStatusCode, Message::getMessage));
    }

    /* 6. ImageFile 응답 */
    @GetMapping(value = "/image", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage() throws IOException {
        return getClass().getResourceAsStream("/images/i13743711994.jpg").readAllBytes();
    }

    /* 7. ResponseEntity 응답 */
    @GetMapping("/entity")
    public ResponseEntity<Message> getEntity() {
        return ResponseEntity.ok(new Message(123, "hello world!")); //ok. : status에 있는 케이스. (new Message(123, "hello world!")) : body에 있는 값.
    }
}
