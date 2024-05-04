package com.tecnochi.dropiapp.controllers;


import com.tecnochi.dropiapp.DTOs.ProductDTO;
import com.tecnochi.dropiapp.ProductRepository;
import com.tecnochi.dropiapp.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/products")
    public ResponseEntity<?> saveProducts(@RequestBody List<ProductDTO> productsDTO){


        List<Product> products= productsDTO.stream().map(productDTO -> new Product(productDTO.getDropiId(),productDTO.getName(),productDTO.getStock(), productDTO.getPrice())).collect(Collectors.toList());
        List <Long> productsDropiId = productRepository.findAll().stream().map(Product::getDropiId).toList();

        List <Product> newProducts = products.stream().filter(product -> !productsDropiId.contains(product.getDropiId())).toList();
        boolean myProductsMatchId = productRepository.findAll().stream().anyMatch(product -> productsDropiId.contains(product.getDropiId()));


        productRepository.saveAll(newProducts);

        return new ResponseEntity<>(newProducts, HttpStatusCode.valueOf(201));
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){

       return productRepository.findAll();
    }
}
