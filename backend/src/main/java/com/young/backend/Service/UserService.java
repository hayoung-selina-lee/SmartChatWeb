package com.young.backend.Service;

import com.young.backend.Dto.SigninDto;
import com.young.backend.Entity.SigninEntity;
import com.young.backend.Entity.UserEntity;
import com.young.backend.Repository.UserRepository;
import com.young.backend.Utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<UserEntity> getUserByName(String name) {
        return userRepository.getUserByName(name);
    }

    public Optional<UserEntity> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * check available to signin
     * @param SigninEntity User's signin data (e-mail and password)
     * @return SigninDto (statusCode + registered user information)
     *         statusCode : Success = match user information
     *                      fail = not match user information
     */
    public Optional<SigninDto> checkSignin(SigninEntity signIn) {
        Optional<UserEntity> userData = userRepository.findByEmail(signIn.getEmail());

        if (userData.isPresent()) {
            UserEntity user = userData.get();
            if (user.getPassword().equals(signIn.getPassword())) {
                SigninDto response = new SigninDto(StatusCode.SUCCESS, user);
                return Optional.of(response);
            } else {
                return Optional.of(new SigninDto(StatusCode.FAIL, null));
            }
        }

        return Optional.empty();
    }
}
