package com.example.tenpaws.domain.chat.chatroom.controller;

import com.example.tenpaws.domain.chat.chatroom.dto.ChatRoomRequest;
import com.example.tenpaws.domain.chat.chatroom.dto.ChatRoomResponse;
import com.example.tenpaws.domain.chat.chatroom.dto.ClosedChatRoomResponse;
import com.example.tenpaws.domain.chat.chatroom.service.ChatRoomService;
import com.example.tenpaws.domain.chat.unread.dto.UnReadChatMessagesResponse;
import com.example.tenpaws.domain.chat.unread.service.UnReadChatMessagesService;
import com.example.tenpaws.global.security.service.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Tag(name = "채팅방 API", description = "채팅방 기능을 모아둔 컨트롤러 입니다")
@RequestMapping("/api/v1/chatrooms")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final UnReadChatMessagesService unReadChatMessagesService;
    private final CustomUserDetailsService customUserDetailsService;
    private final SimpMessagingTemplate messagingTemplate;

    @Operation(summary = "채팅방 목록 조회", description = "본인이 참여중인 채팅방 목록 조회 API")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_SHELTER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<List<ChatRoomResponse>> findChatRoomsByUser(Authentication authentication) {
        String user = authentication.getName();
        List<ChatRoomResponse> chatRoomResponseList = chatRoomService.getChatRoomsByUser(user);
        List<UnReadChatMessagesResponse> unReadChatMessagesResponseList = unReadChatMessagesService.read(user);
        for (int i = 0; i < chatRoomResponseList.size(); i++) {
            String email1 = chatRoomResponseList.get(i).getUserEmail();
            String email2 = chatRoomResponseList.get(i).getOppositeEmail();
            chatRoomResponseList.get(i).setUserEmail(user);
            chatRoomResponseList.get(i).setOppositeEmail(user.equals(email1) ? email2 : email1);
            String oppositeName = customUserDetailsService.getInfosByEmail(chatRoomResponseList.get(i).getOppositeEmail()).get("username").toString();
            chatRoomResponseList.get(i).setOppositeName(oppositeName);
            chatRoomResponseList.get(i).setUnReadCount(unReadChatMessagesResponseList.get(i).getUnReadCount());
        }
        return ResponseEntity.ok(chatRoomResponseList);
    }

    @Operation(summary = "채팅방 생성", description = "채팅방 생성 API")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN') or (hasAnyRole('ROLE_USER', 'ROLE_SHELTER') and #chatRoomRequest.userEmail == authentication.name)")
    @PostMapping
    public ResponseEntity<ChatRoomResponse> createChatRoom(@Valid @RequestBody ChatRoomRequest chatRoomRequest) {
        ChatRoomResponse chatRoomResponse = chatRoomService.create(chatRoomRequest);
        chatRoomResponse.setUserEmail(chatRoomRequest.getUserEmail());
        chatRoomResponse.setOppositeEmail(chatRoomRequest.getOppositeEmail());
        String oppositeName = customUserDetailsService.getInfosByEmail(chatRoomResponse.getOppositeEmail()).get("username").toString();
        chatRoomResponse.setOppositeName(oppositeName);
        unReadChatMessagesService.create(chatRoomResponse.getChatRoomId(), chatRoomResponse.getUserEmail(), chatRoomResponse.getOppositeEmail());
        return ResponseEntity.ok(chatRoomResponse);
    }

    @Operation(summary = "채팅방 삭제", description = "채팅방 삭제 API")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPER_ADMIN') or (hasAnyRole('ROLE_USER', 'ROLE_SHELTER') and @chatRoomServiceImpl.isUserParticipated(#chatRoomId))")
    @DeleteMapping("/{chatRoomId}")
    public ResponseEntity<Map<String, String>> deleteChatRoom(@PathVariable("chatRoomId") Long chatRoomId, Authentication authentication) {
        ChatRoomResponse chatRoom = chatRoomService.getChatRoom(chatRoomId);
        String receiver = authentication.getName().equals(chatRoom.getUserEmail()) ? chatRoom.getOppositeEmail() : chatRoom.getUserEmail();
        chatRoomService.delete(chatRoomId);
        messagingTemplate.convertAndSendToUser(
                receiver,
                "/queue/chatroom-close",
                new ClosedChatRoomResponse(chatRoomId, "상대방이 채팅방을 나갔습니다.")
        );
        return ResponseEntity.ok(Map.of("message", "ChatRoom deleted"));
    }
}
