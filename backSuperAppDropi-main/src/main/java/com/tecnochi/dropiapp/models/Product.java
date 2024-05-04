package com.tecnochi.dropiapp.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long Id;
    Long dropiId;
    String name;
    String stock;
    String price;

    public Product() {
    }

    public Product(Long dropId, String name,String stock, String price) {
        this.dropiId = dropId;
        this.name = name;
        this.price = price;
        this.stock = stock;

    }

    public long getId() {
        return Id;
    }

    public Long getDropiId() {
        return dropiId;
    }

    public void setDropiId(Long dropId) {
        this.dropiId = dropId;
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
