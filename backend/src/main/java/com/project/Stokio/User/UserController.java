package com.project.Stokio.User;

import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final UserRepository userRepository;
    private final  UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/login")
    public Users getUser(@RequestBody Users u  ){
        return userService.logIn(u);
    }
    @PostMapping("/signUp")
    public Users postUser(@RequestBody Users user){
        Users user1= userRepository.save(user);
        return user1;
    }

}
