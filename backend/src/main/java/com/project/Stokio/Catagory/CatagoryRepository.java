package com.project.Stokio.Catagory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CatagoryRepository extends JpaRepository<Catagory,Integer> {
    public Optional<Catagory> findByName(String name);

}
