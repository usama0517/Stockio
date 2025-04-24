package com.project.Stokio.Catagory;

import com.project.Stokio.CustomMadeExceptions;
import com.project.Stokio.User.UserService;
import com.project.Stokio.User.Users;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/catagory")
public class CatagoryController {
   private  CatagoryMapper catagoryMapper= new CatagoryMapper();
    private final UserService userService;
    private final CatagoryRepository catagoryRepository;

    public CatagoryController(UserService userService , CatagoryRepository catagoryRepository) {

        this.userService = userService ;
        this.catagoryRepository = catagoryRepository;
    }
    @PostMapping
    public Catagory createCatagory(@RequestBody CatagoryDto catagoryDto){
        Users u = new Users();
        u.setEmail(catagoryDto.userEmail());
        u.setPassword(catagoryDto.password());
        Users user = userService.logIn(u);
        if(user!=null){
       Catagory c = catagoryMapper.toCatagory(catagoryDto);
        c.setUser(user);
        return catagoryRepository.save(c);
    }
        return null;
    }
    @GetMapping
    public Catagory getCatagory(@RequestBody String name){
        return catagoryRepository.findByName(name).orElseThrow(
                ()-> {
                    throw new CustomMadeExceptions("This Catgory can Not Be Found");
                }
        );


    }
    @DeleteMapping
    public void deleteByID(@RequestBody Integer id){
        catagoryRepository.deleteById(id);
    }

    @GetMapping("/all")
    public List<Catagory> getAllCatagories(){
        return catagoryRepository.findAll();
    }
}
