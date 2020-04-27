package com.adamMlodozeniec.workoutTracker.controller;

import com.adamMlodozeniec.workoutTracker.exception.ResourceNotFoundException;
import com.adamMlodozeniec.workoutTracker.model.Exercise;
import com.adamMlodozeniec.workoutTracker.model.Set;
import com.adamMlodozeniec.workoutTracker.model.UpdateObject;
import com.adamMlodozeniec.workoutTracker.model.Workout;
import com.adamMlodozeniec.workoutTracker.repository.WorkoutRepository;
import org.apache.tomcat.jni.Error;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user/workouts")
public class WorkoutController {

    private WorkoutRepository workoutRepository;

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @GetMapping("/all")
    public List<Workout> getAll(){
        return workoutRepository.findAll();
    }

    @GetMapping("/{workoutName}")
    public List<Workout> findWorkoutByName(@PathVariable String workoutName){
        return workoutRepository.findWorkoutByName(workoutName);
    }

    @PostMapping("/{id}")
    public Workout addExerciseToWorkout(@RequestBody Exercise exercise, @PathVariable String id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        List<Exercise> exercises = workout.getExercises();
        exercises.add(exercise);
        workout.setExercises(exercises);
        return workoutRepository.save(workout);
    }

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout){
        workoutRepository.save(workout);
        return workout;
    }

    @PostMapping("/{id}/{exerciseName}")
    public Workout addSet(@RequestBody Set set, @PathVariable String id, @PathVariable String exerciseName){
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        List<Exercise> exercises = workout.getExercises();
        for(int i = 0; i < exercises.size(); i++){
            Exercise e = exercises.get(i);
            if(e.getName().equals(exerciseName)){
                List<Set> sets = e.getSets();
                set.setNewSet(false);
                sets.add(set);
                exercises.get(i).setSets(sets);
                break;
            }
        }
        workout.setExercises(exercises);
        workoutRepository.save(workout);
        return workout;
    }

    @PutMapping("/{id}/{exerciseName}/{setNumber}")
    public Workout updateSet(@RequestBody UpdateObject obj, @PathVariable String id, @PathVariable String exerciseName, @PathVariable int setNumber){
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        List<Exercise> exercises = workout.getExercises();
        for(int i = 0; i < exercises.size(); i++){
            Exercise e = exercises.get(i);
            if(e.getName().equals(exerciseName)){
                List<Set> sets = e.getSets();
                for(int j = 0; j < sets.size(); j++){
                    Set set = sets.get(j);
                    if(set.getSetNumber() == setNumber){
                        set.setWeight(obj.getWeight());
                        set.setReps(obj.getReps());
                        sets.set(j, set);
                        break;
                    }
                }
                exercises.get(i).setSets(sets);
                break;
            }
        }
        workout.setExercises(exercises);
        workoutRepository.save(workout);
        return workout;
    }

    @DeleteMapping("/{id}")
    public String deleteWorkout(@PathVariable String id){
        workoutRepository.deleteById(id);
        return id;
    }

    @DeleteMapping("/{id}/{exerciseName}")
    public Workout deleteExerciseInWorkout(@PathVariable String id, @PathVariable String exerciseName) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        List<Exercise> exercises = workout.getExercises();
        for(int i = 0; i < exercises.size(); i++) {
            Exercise e = exercises.get(i);
            if(e.getName().equals(exerciseName)){
                exercises.remove(i);
                break;
            }
        }
        workout.setExercises(exercises);
        return workoutRepository.save(workout);
    }

    @DeleteMapping("/{id}/{exerciseName}/{setNumber}")
    public boolean deleteSetInWorkout(@PathVariable String id, @PathVariable String exerciseName, @PathVariable int setNumber) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        List<Exercise> exercises = workout.getExercises();
        int size = exercises.size();
        for (int i = 0; i < size; i++) {
            Exercise e = exercises.get(i);
            if (e.getName().equals(exerciseName)) {
                List<Set> sets = e.getSets();
                for (int j = 0; j < sets.size(); j++) {
                    Set set = sets.get(j);
                    if (set.getSetNumber() == setNumber) {
                        sets.remove(j);
                        sets = decrementSets(sets, j);
                        break;
                    }
                }
                exercises.get(i).setSets(sets);
                if(sets.size() == 0){
                    exercises.remove(i);
                }
                break;
            }
        }

        if(exercises.size() == 0){
            workoutRepository.deleteById(id);
        } else {
            workout.setExercises(exercises);
            workoutRepository.save(workout);
        }

        return true;
    }

    public List<Set> decrementSets(List<Set> sets, int limit) {
        for(int i = limit; i < sets.size(); i++) {
            sets.get(i).setSetNumber(sets.get(i).getSetNumber() - 1);
        }
        return sets;
    }
}
