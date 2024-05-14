package com.young.backend.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class SigninEntity {

    @Id
    private String id;
    private String email;
    private String password;

    @Override
    public String toString() {
        return "e-mail : " + email + " // pwd : " + password;
    }
}
