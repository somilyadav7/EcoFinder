package com.example.backend.Payload;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderDto {
    private String model;
    private Long phone;
    private LocalDate date;
    private Double price;
    private String facility;
    private String username;
    private String category;
    private String location;
    private String Status;
}
