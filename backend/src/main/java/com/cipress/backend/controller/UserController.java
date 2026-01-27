package com.cipress.backend.controller;

import com.cipress.backend.entity.User;
import com.cipress.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        try {
            User user = new User();
            user.setFirstName(payload.get("firstName"));
            user.setLastName(payload.get("lastName"));
            user.setRegion(payload.get("region"));
            user.setEmail(payload.get("email"));
            user.setPasswordHash(payload.get("password")); // Note: Should be hashed

            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("success", true, "message", "Usuario registrado exitosamente", "userId",
                    registeredUser.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
