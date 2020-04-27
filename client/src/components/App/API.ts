const API_URL = 'http://localhost:8095';

export default async function listWorkoutEntries() {
  const response = await (fetch(`${API_URL}/user/workouts`));
  // console.log(typeof response.json());
  return response.json();
}

// export default async function deleteWorkout() {

// }
