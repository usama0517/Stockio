package com.project.Stokio.Catagory;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.Stokio.Product.Product;
import com.project.Stokio.User.Users;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Catagory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Users user;

    @OneToMany(mappedBy = "catagory")
    @JsonManagedReference
    private List<Product> product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }

    public String getName() {
        return name;
    }

    public Users getUser() {
        return user;
    }

    public List<Product> getProduct() {
        return product;
    }
}
