# User
* Username - Text
* Password - Text
* Workouts - Array of objects
  - Focus (Strength/Hypertrophy) - Text
  - Exercises - Array of Objects
    - Exercise Name - Text
    - Sets - Number
    - Weight - Number
    - Reps - Number
  - Days - Number

* Current iteration of Entry (V1)
```JSON
"exercise": {
		"name": "Bench Press",
		"set": [
			{
				"id": 1,
				"weight": 200,
				"reps": 5
			},
			{
				"id": 2,
				"weight": 210,
				"reps": 3
			},
			{
				"id": 3,
				"weight": 220,
				"reps": 1
			}
		]
	}
```