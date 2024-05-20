package com.young.backend.Service;

import com.young.backend.Entity.UserEntity;
import com.young.backend.Repository.UserRepository;
import com.young.backend.Utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.Optional;

@Service
public class SignUpService {
    private final UserRepository userRepository;

    @Autowired
    public SignUpService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<String> checkEmail(String email) {
        Optional<UserEntity> userData = userRepository.findByEmail(email);

        if (userData.isPresent()) {
            return ResponseEntity.status(409).body("Email is already in use");
        } else {
            return ResponseEntity.ok("Email is available");
        }
    }

    public ResponseEntity<String> registerUser(UserEntity user) {
        user.setScore(0); // set init score point

        userRepository.save(user); // save to db

        return ResponseEntity.ok("Success to create");
    }
}
