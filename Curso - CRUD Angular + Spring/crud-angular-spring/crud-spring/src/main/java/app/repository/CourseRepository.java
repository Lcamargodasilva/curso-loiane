package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}