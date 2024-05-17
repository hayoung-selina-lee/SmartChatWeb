package com.young.backend.Controller;

import com.young.backend.Entity.SigninEntity;
import com.young.backend.Entity.UserEntity;
import com.young.backend.Service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signin")
public class SignInController {

    private final SignInService signInService;

    @Autowired
    public SignInController(SignInService signInService){
        this.signInService = signInService;
    }

    /**
     * check available to signin
     * @param SigninEntity User's signin data (e-mail and password)
     * @return ResponseEntity<UserEntity>
     *     response code - 401 : password is not correct
     *                   - 404 : not found
     *                   - ok : pass
     */
    @PostMapping("/check")
    public ResponseEntity<UserEntity> checkSignIn(@RequestBody SigninEntity signIn) {
        return signInService.checkSignIn(signIn);
    }
}
