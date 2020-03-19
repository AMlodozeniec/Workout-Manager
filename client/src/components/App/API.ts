const API_URL = 'http://localhost:3001';

export default async function listWorkoutEntries() {
  const response = await (fetch(`${API_URL}/api/logs`));
  // console.log(typeof response.json());
  return response.json();
}

// export default async function deleteWorkout() {

// }
