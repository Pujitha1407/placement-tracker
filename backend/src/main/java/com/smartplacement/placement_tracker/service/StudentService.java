package com.smartplacement.placement_tracker.service;

import org.springframework.stereotype.Service;

import com.smartplacement.placement_tracker.model.Student;
import com.smartplacement.placement_tracker.repository.StudentRepository;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedStudent.getName());
            existing.setRollNumber(updatedStudent.getRollNumber());
            existing.setBranch(updatedStudent.getBranch());
            existing.setCgpa(updatedStudent.getCgpa());
            existing.setSkills(updatedStudent.getSkills());
            existing.setEmail(updatedStudent.getEmail());
            existing.setPhone(updatedStudent.getPhone());
            existing.setStatus(updatedStudent.getStatus());
            return studentRepository.save(existing);
        }
        return null;
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}

