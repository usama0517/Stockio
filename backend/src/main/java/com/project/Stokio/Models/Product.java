package com.project.Stokio.Models;

import jakarta.persistence.GeneratedValue;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
public class Product {
    @jakarta.persistence.Id
    @GeneratedValue(strategy=SEQUENCE, generator="Pro_SEQ")
    private Integer Id;
    private String Name;
    private String description;
    private double Amount;
    private double price;

}
