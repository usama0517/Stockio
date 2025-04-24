package com.project.Stokio.Catagory;

import org.springframework.context.annotation.Bean;


public class CatagoryMapper {
    public Catagory toCatagory(CatagoryDto dto){
        Catagory c = new Catagory();
        c.setName(dto.name());
        return c;
    }

    public CatagoryDto toDto(Catagory c){
        CatagoryDto dto = new CatagoryDto(c.getName(),c.getUser().getEmail(),null);
        return dto;
    }
}
