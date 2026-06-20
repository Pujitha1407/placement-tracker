package com.smartplacement.placement_tracker.service;



import org.springframework.stereotype.Service;

import com.smartplacement.placement_tracker.model.Company;
import com.smartplacement.placement_tracker.repository.CompanyRepository;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(Long id, Company updatedCompany) {
        Company existing = companyRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedCompany.getName());
            existing.setIndustry(updatedCompany.getIndustry());
            existing.setLocation(updatedCompany.getLocation());
            existing.setEmail(updatedCompany.getEmail());
            existing.setPhone(updatedCompany.getPhone());
            return companyRepository.save(existing);
        }
        return null;
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}

