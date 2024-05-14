package com.young.backend.Controller;

import com.young.backend.Dto.SigninDto;
import com.young.backend.Entity.SigninEntity;
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

    /**
     * check available to signin
     * @param SigninEntity User's signin data (e-mail and password)
     * @return SigninDto (statusCode + registered user information)
     *         statusCode : Success = match user information
     *                      fail = not match user information
     */
    @PostMapping("/signin/check")
    public Optional<SigninDto> checkSignin(@RequestBody SigninEntity signIn) {
        return userService.checkSignin(signIn);
    }
}
