package com.adamMlodozeniec.workoutTracker.repository;

import com.adamMlodozeniec.workoutTracker.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    List<Workout> findWorkoutByName(String workoutName);
}
