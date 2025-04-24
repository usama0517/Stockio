package com.project.Stokio.User;

import com.project.Stokio.CustomMadeExceptions;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users logIn(Users u  ){
        Users user= userRepository.findByEmail(u.getEmail())
                .orElseThrow(()-> {
                    throw new CustomMadeExceptions("This User with this Email: "+ u.getEmail()+"Is Not Found");
                });
        if(Objects.equals(user.getPassword(), u.getPassword())){
            return user;
        }
        else {
            throw new CustomMadeExceptions("The Password is incorrect please try again");
        }

    }
}
