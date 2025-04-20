package com.project.Stokio.Models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.SEQUENCE;
@Data
public class Sales {
   @Id
    @GeneratedValue(strategy=SEQUENCE, generator="Pro_SEQ")
    private Integer Id;
    @CreationTimestamp
    @Column(updatable = false,nullable = false)
    private LocalDateTime soldAt;
    private Double soldAmmount;
    private Integer productId;

}
