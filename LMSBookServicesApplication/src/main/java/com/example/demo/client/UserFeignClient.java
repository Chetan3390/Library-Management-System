//package com.example.demo.client;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import com.example.demo.entity.UserInfo;
//
//@FeignClient(name = "user-service")
//public interface UserFeignClient {
//
//    @GetMapping("/users/{username}")
//    UserInfo getUserByUsername(@PathVariable("username") String username);
//}
