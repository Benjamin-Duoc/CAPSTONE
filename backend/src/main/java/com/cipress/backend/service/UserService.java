package com.cipress.backend.service;

import com.cipress.backend.entity.User;
import com.cipress.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        // In a real application, you should hash the password here before saving
        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPasswordHash().equals(password)) // Simple check, use BCrypt in prod
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
