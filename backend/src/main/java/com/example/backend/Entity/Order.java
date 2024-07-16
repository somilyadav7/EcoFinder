package com.example.backend.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "orders")
public class Order {
    @Id
    private String _id; // Change to String and use _id

    private String model;
    private Long phone;
    private LocalDate date;
    private Double price;
    private String facility;
    private String username;
    private String category;
    private String location;
    private String status;
}
