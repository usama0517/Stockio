package com.project.Stokio.Models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
public class Catagory {
    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="CAT_SEQ")
    private Integer Id;
    private String name;
}
