package com.smartplacement.placement_tracker.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.smartplacement.placement_tracker.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // You can add custom queries here if needed
}

