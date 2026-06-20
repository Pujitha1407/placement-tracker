package com.smartplacement.placement_tracker.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.smartplacement.placement_tracker.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}

