package com.adamMlodozeniec.workoutTracker.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Exercise")
public class Exercise {
    private String id;
    private String name;
    private List<Set> sets;
    private boolean isAddingNewSet;
    private int editSetIdx;

    public Exercise(String id, String name, List<Set> sets, boolean isAddingNewSet, int editSetIdx) {
        this.id = id;
        this.name = name;
        this.sets = sets;
        this.isAddingNewSet = isAddingNewSet;
        this.editSetIdx = editSetIdx;
    }

    public String getId() {
        return id;
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

    public List<Set> getSets() {
        return sets;
    }

    public void setSets(List<Set> sets) {
        this.sets = sets;
    }

    public boolean isAddingNewSet() {
        return isAddingNewSet;
    }

    public void setAddingNewSet(boolean addingNewSet) {
        isAddingNewSet = addingNewSet;
    }

    public int getEditSetIdx() {
        return editSetIdx;
    }

    public void setEditSetIdx(int editSetIdx) {
        this.editSetIdx = editSetIdx;
    }

    @Override
    public String toString(){
        return "Exercise: " + name + "; " + sets;
    }
}
