package com.young.backend.Repository;

import com.young.backend.Entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> getUserByName(String name);
    Optional<UserEntity> findByEmail(String email);
}
