package com.young.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(value = {"", "/vscode"})
    public String enter() {
        return "HelloVSCode";
    }

    @GetMapping(value = {"", "/showMe"})
    public String hello() {
        return "1";
    }

}