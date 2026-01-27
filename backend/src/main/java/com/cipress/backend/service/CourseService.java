package com.cipress.backend.service;

import com.cipress.backend.entity.Course;
import com.cipress.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository repository;

    public List<Course> getAll() {
        return repository.findAll();
    }

    public Course save(Course course) {
        return repository.save(course);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
