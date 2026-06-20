package com.smartplacement.placement_tracker.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String rollNumber;
    private String branch;
    private Double cgpa;
    private String skills;
    private String email;
    private String phone;
    private String status; // e.g., Applied, Shortlisted, Placed
}
