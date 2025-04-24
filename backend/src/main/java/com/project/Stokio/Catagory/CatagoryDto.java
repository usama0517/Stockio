package com.project.Stokio.Catagory;

// I can Recive user id instead of email and password but for seurity reasons i decided to use email and password

public record CatagoryDto(String name, String userEmail, String password) {
}
