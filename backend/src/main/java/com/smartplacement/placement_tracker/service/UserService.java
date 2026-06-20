package com.smartplacement.placement_tracker.service;



import org.springframework.stereotype.Service;

import com.smartplacement.placement_tracker.model.User;
import com.smartplacement.placement_tracker.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
