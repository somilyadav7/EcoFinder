package com.example.backend.Entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String _id; // Change to String and use _id

    private String name;
    private String username;
    private String email;
    private String password;
    private String city;
    @DBRef
    private Set<Role> roles;
}
