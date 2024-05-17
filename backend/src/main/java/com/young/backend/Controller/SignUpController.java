package com.young.backend.Controller;

import com.young.backend.Entity.UserEntity;
import com.young.backend.Service.SignUpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/signup")
public class SignUpController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final SignUpService signUpService;

    @Autowired
    public SignUpController(SignUpService signUpService){
        this.signUpService = signUpService;
    }


    /**
     * check available to register Email
     * @param String email
     * @return ResponseEntity<String> - 409 : already exist
     *                                - ok : available
     */
    @PostMapping("/checkmail")
    public ResponseEntity<String> checkEmail(@RequestParam String email) {
        log.info("checkEmail - email : " + email);
        return signUpService.checkEmail(email);

    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        return signUpService.registerUser(user);

    }
}
