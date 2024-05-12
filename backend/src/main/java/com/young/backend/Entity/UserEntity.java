package com.young.backend.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class UserEntity {

    @Id
    private String id;
    private String email;
    private String password;
    private String name;
    private String gender;
    private int age;
    private int score;
    // private String location;
    @Override
    public String toString() {
        return "e-mail : " + email + " // name : " + name;
    }
}
