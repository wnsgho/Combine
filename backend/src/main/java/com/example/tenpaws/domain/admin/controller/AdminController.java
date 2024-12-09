package com.example.tenpaws.domain.admin.controller;

import com.example.tenpaws.domain.admin.dto.AdminRequestDTO;
import com.example.tenpaws.domain.admin.dto.AdminResponseDTO;
import com.example.tenpaws.domain.admin.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "관리자 기능 API", description = "관리자 기능을 모아둔 컨트롤러 입니다")
@RequestMapping("/api/v1/admins")
public class AdminController {

    private final AdminService adminService;

    // 관리자 생성 (슈퍼 관리자 : 모든 일반 관리자 생성 권한은 슈퍼 관리자만 소유)
    @Operation(summary = "관리자 생성", description = "관리자 생성 API, ROLE_SUPER_ADMIN만 가능하게 설정")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PostMapping
    public ResponseEntity<AdminResponseDTO> createAdmin(@RequestBody @Valid AdminRequestDTO adminRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createAdmin(adminRequestDTO));
    }

    // 관리자 삭제 (슈퍼 관리자 : 모든 일반 관리자 삭제 권한은 슈퍼 관리자만 소유)
    @Operation(summary = "관리자 삭제", description = "관리자 삭제 API, ROLE_SUPER_ADMIN만 가능하게 설정")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    // 관리자 조회 (슈퍼 관리자: 모든 관리자 조회, 일반 관리자: 본인만 조회 가능)
    @Operation(summary = "관리자 조회", description = "관리자 조회 API, 관리자만 가능하게 설정")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN') or (hasRole('ROLE_ADMIN') and @adminService.isAdminOwn(#id))")
    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> getAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdmin(id));
    }

    // 관리자 정보 수정 (슈퍼 관리자: 모든 관리자 수정, 일반 관리자: 본인만 수정 가능)
    @Operation(summary = "관리자 수정", description = "관리자 수정 API, ROLE_SUPER_ADMIN은 모든 일반 관리자 수정 가능, ROLE_ADMIN은 자신 정보만 수정 가능")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN') or (hasRole('ROLE_ADMIN') and @adminService.isAdminOwn(#id))")
    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> updateAdmin(@PathVariable Long id, @RequestBody AdminRequestDTO adminRequestDTO) {
        return ResponseEntity.ok(adminService.updateAdmin(id, adminRequestDTO));
    }
}
