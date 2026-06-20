package com.smartplacement.placement_tracker.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.smartplacement.placement_tracker.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username); // useful for login
}

