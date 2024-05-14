package com.young.backend.Dto;

import com.young.backend.Entity.UserEntity;
import lombok.Data;

@Data
public class SigninDto {
    private String status;
    private UserEntity data;

    public SigninDto(String status, UserEntity data) {
        this.status = status;
        this.data = data;
    }
}
