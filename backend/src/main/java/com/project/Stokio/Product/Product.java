package com.project.Stokio.Product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.Stokio.Catagory.Catagory;
import com.project.Stokio.Report.Sales;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;


@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private double amount;
    private double price;
    @OneToMany
    private List<Sales> sales;
    @ManyToOne
    @JoinColumn(name = "catagory_id")
    @JsonBackReference
    private Catagory catagory;

    public void setSales(List<Sales> sales) {
        this.sales = sales;
    }

    public void setCatagory(Catagory catagory) {
        this.catagory = catagory;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public double getPrice() {
        return price;
    }

    public List<Sales> getSales() {
        return sales;
    }

    public Catagory getCatagory() {
        return catagory;
    }

    public Product(String name, String description, double amount, double price, Catagory catagory) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.catagory= catagory;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
