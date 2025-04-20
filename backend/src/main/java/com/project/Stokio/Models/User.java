package com.project.Stokio.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="User_SEQ")
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
