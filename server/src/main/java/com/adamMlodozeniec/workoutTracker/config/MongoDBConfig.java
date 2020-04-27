package com.adamMlodozeniec.workoutTracker.config;

import com.adamMlodozeniec.workoutTracker.model.Workout;
import com.adamMlodozeniec.workoutTracker.repository.WorkoutRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = WorkoutRepository.class)
@Configuration
public class MongoDBConfig {

//    @Bean
//    CommandLineRunner commandLineRunner(WorkoutRepository workoutRepository) {
//
////        return strings -> {
////            workoutRepository.save(new Workout(3,"Workout 1", false, false));
////            workoutRepository.save(new Workout(5,"Workout 2",false, false));
////        };
//    }
}
