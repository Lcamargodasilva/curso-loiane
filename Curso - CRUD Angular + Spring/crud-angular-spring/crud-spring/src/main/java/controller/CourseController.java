package controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CourseRepository.CourseRepository;
import lombok.AllArgsConstructor;
import model.Course;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController() {
        this.courseRepository = null;
    }

    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }
}
