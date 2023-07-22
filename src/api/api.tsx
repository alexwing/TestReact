import User from "../interfaces/users";


export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/');
  if (!response.ok) {
    throw new Error('Error al obtener los datos de los usuarios');
  }
  return await response.json();
}