package com.smartplacement.placement_tracker.dto;

import com.smartplacement.placement_tracker.model.Student;
import com.smartplacement.placement_tracker.model.Company;

public class PlacementRecordDTO {
    private Long id;
    private Student student;
    private Company company;
    private String jobRole;
    private Double packageOffered;   // ✅ must match entity
    private String status;

    // ✅ Constructor
    public PlacementRecordDTO(Long id, Student student, Company company,
                              String jobRole, Double packageOffered, String status) {
        this.id = id;
        this.student = student;
        this.company = company;
        this.jobRole = jobRole;
        this.packageOffered = packageOffered;
        this.status = status;
    }

    // ✅ Getters
    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public Company getCompany() { return company; }
    public String getJobRole() { return jobRole; }
    public Double getPackageOffered() { return packageOffered; }
    public String getStatus() { return status; }

    // ✅ Setters
    public void setId(Long id) { this.id = id; }
    public void setStudent(Student student) { this.student = student; }
    public void setCompany(Company company) { this.company = company; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }
    public void setPackageOffered(Double packageOffered) { this.packageOffered = packageOffered; }
    public void setStatus(String status) { this.status = status; }
}
