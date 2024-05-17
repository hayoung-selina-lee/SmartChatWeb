package com.young.backend.Service;

import com.young.backend.Entity.SigninEntity;
import com.young.backend.Entity.UserEntity;
import com.young.backend.Repository.UserRepository;
import com.young.backend.Utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SignInService {
    private final UserRepository userRepository;

    @Autowired
    public SignInService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * check available to signin
     * @param SigninEntity User's signin data (e-mail and password)
     * @return SigninDto (statusCode + registered user information)
     *         statusCode : Success = match user information
     *                      fail = not match user information
     */
    public ResponseEntity<UserEntity> checkSignIn(SigninEntity signIn) {
        Optional<UserEntity> userData = userRepository.findByEmail(signIn.getEmail());

        if (userData.isPresent()) {
            UserEntity user = userData.get();
            if (user.getPassword().equals(signIn.getPassword())) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(StatusCode.PASSWORD_FAIL).body(user);
            }
        }

        return ResponseEntity.status(StatusCode.NOT_FOUND).body(new UserEntity());
    }
}
