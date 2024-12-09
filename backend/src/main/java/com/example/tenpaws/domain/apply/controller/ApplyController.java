package com.example.tenpaws.domain.apply.controller;

import com.example.tenpaws.domain.apply.dto.ApplyDto;
import com.example.tenpaws.domain.apply.entity.Apply;
import com.example.tenpaws.domain.apply.service.ApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Tag(name = "지원 관련 API", description = "지원 관련 기능을 모아둔 컨트롤러 입니다")
@RequestMapping("/api/v1/applypet")
public class ApplyController {

    private final ApplyService applyService;

    // 회원의 입양 신청
    @Operation(summary = "입양 신청", description = "입양 신청 API")
    @PreAuthorize("hasRole('ROLE_USER') and @userServiceImpl.isUserOwn(#userId)")
    @PostMapping
    public ResponseEntity<ApplyDto> applyForPet(@RequestParam Long petId, @RequestParam Long userId) {
            ApplyDto apply = applyService.applyForPet(petId, userId);
            return ResponseEntity.ok(apply);
    }

    // 입양 신청 취소
    @Operation(summary = "입양 신청 취소", description = "입양 신청 취소로 상태 변경 API")
    @PreAuthorize("hasRole('ROLE_USER') and @userServiceImpl.isUserOwn(#userId)")
    @PostMapping("/{applyId}/cancel")  // applyId 내에서 userId로 "필터링"하는 것이기 때문에 쿼리파라미터로 받음
    public ResponseEntity<String> cancelApply(
            @PathVariable Long applyId,
            @RequestParam Long userId) {
        applyService.cancelApply(applyId, userId);
        return ResponseEntity.ok("Application has been canceled successfully.");
    }

    // 회원 입양 신청 조회
    @Operation(summary = "입양 신청 조회", description = "회원별 입양 신청 조회 API")
    @PreAuthorize("hasRole('ROLE_USER') and @userServiceImpl.isUserOwn(#userId)")
    @GetMapping("/{userId}/list")
    public ResponseEntity<List<ApplyDto>> listApply(@PathVariable Long userId) {
        List<ApplyDto> userApplies = applyService.getApplies(userId);
        return ResponseEntity.ok(userApplies);
    }

    // 보호소 신청 목록 조회
    @Operation(summary = "입양 신청 목록 조회", description = "보호소별 입양 목록 조회 API")
    @PreAuthorize("hasAnyRole('ROLE_SHELTER')")
    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<ApplyDto>> getAppliesForShelter(@PathVariable Long shelterId) {
        List<ApplyDto> applies = applyService.getAppliesForShelter(shelterId);
        return ResponseEntity.ok(applies);
    }

    // 심사 : 신청 상태 변경
    @Operation(summary = "입양 신청 심사", description = "입양 신청 심사 상태 변경 API")
    @PreAuthorize("hasRole('ROLE_SHELTER') and @petService.isShelterApplicant(#shelterId)")
    @PutMapping("/{shelterId}/status") // shelterId로 고정된 상태에서 applyId는 정렬, status의 변화에 따라 여러가지 상태 중 하나를 나타내기 때문에 쿼리파라미터로 받음
    public ResponseEntity<ApplyDto> updateApplyStatus(@RequestParam Long applyId, @RequestParam String status, @PathVariable Long shelterId) {
        ApplyDto updatedApply = applyService.updateApplyStatus(applyId, status);
        return ResponseEntity.ok(updatedApply);
    }
}
