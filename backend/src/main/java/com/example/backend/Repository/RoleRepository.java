package com.example.backend.Repository;

import com.example.backend.Entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> { // Change ObjectId to String
    Optional<Role> findByName(String name);
}
