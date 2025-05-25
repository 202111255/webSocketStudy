package com.example.chat_be;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/chat")
public class MessageController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public void sendMessage(@RequestBody String message) {
        messagingTemplate.convertAndSend("/topic/messages", message);  // WebSocket 메시지 전송
    }
}
