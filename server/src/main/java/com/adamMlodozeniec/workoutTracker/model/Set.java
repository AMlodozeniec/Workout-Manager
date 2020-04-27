package com.adamMlodozeniec.workoutTracker.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Set")
public class Set {
    private String name;
    private int setNumber;
    private int weight;
    private int reps;
    private boolean newSet;

    public Set(String name, int setNumber, int weight, int reps, boolean newSet) {
        this.name = name;
        this.setNumber = setNumber;
        this.weight = weight;
        this.reps = reps;
        this.newSet = newSet;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSetNumber() {
        return setNumber;
    }

    public void setSetNumber(int setNumber) {
        this.setNumber = setNumber;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public boolean isNewSet() {
        return newSet;
    }

    public void setNewSet(boolean newSet) {
        this.newSet = newSet;
    }
}
