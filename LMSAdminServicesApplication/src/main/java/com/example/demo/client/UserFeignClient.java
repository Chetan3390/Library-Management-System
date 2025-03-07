package com.example.demo.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.User;

@FeignClient(name = "user-service")
public interface UserFeignClient {

    @GetMapping("/auth/users/{username}")
    User getUserByUsername(@PathVariable("username") String username);
    
    @GetMapping("/auth/users")
    List<User> getAllUsers();
}
