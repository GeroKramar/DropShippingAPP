package com.tecnochi.dropiapp.DTOs;

public class ProductDTO {


    Long dropiId;
    String name;
    String stock;
    String price;

    public ProductDTO() {
    }

    public ProductDTO(Long dropiId, String name,String stock, String price) {
        this.dropiId = dropiId;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public Long getDropiId() {
        return dropiId;
    }

    public void setDropiId(Long dropiId) {
        this.dropiId = dropiId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


}
