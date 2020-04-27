package com.adamMlodozeniec.workoutTracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Workout")
public class Workout {

    @Id
    private String id;
    private String name;
    private List<Exercise> exercises;
    private boolean isAddingNewExercise;
    private boolean isShowingExercises;

    public Workout(String id, String name, List<Exercise> exercises, boolean isAddingNewExercise, boolean isShowingExercises) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
        this.isAddingNewExercise = isAddingNewExercise;
        this.isShowingExercises = isShowingExercises;
    }

    public String getId() {
        return id;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAddingNewExercise() {
        return isAddingNewExercise;
    }

    public void setAddingNewExercise(boolean addingNewExercise) {
        isAddingNewExercise = addingNewExercise;
    }

    public boolean isShowingExercises() {
        return isShowingExercises;
    }

    public void setShowingExercises(boolean showingExercises) {
        isShowingExercises = showingExercises;
    }

    @Override
    public String toString(){
        return id + "; " + name + "; exercises: " + exercises.toString() + "; " + isAddingNewExercise + " " + isShowingExercises;
    }
}
