package com.project.Stokio.Report;

import com.project.Stokio.Product.Product;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.SEQUENCE;
@Data
@Entity
public class Sales {


 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    @CreationTimestamp
    @Column(updatable = false,nullable = false)
    private LocalDateTime soldAt;
    private String name;
    private String description;
    private double amount;
    private double price;

}
