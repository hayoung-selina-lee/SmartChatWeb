package com.young.backend.Controller;

import com.young.backend.Entity.UserEntity;
import com.young.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public Optional<UserEntity> getUserByName(@RequestParam String name) {
        return userService.getUserByName(name);
    }

}
