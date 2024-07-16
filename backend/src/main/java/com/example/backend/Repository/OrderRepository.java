package com.example.backend.Repository;

import com.example.backend.Entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> { // Change ObjectId to String
    List<Order> findByUsername(String username); // Find orders by username
    void deleteByUsername(String username); // Delete orders by username
}
