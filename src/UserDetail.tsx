import React, { useEffect, useState } from "react";
import User from "./interfaces/users";

interface UserDetailProps {
  id: number;
}

function UserDetail({ id }: UserDetailProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    if (!id || id === 0) {
      return;
    }
    // Cargar detalles del usuario
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));

    // Cargar álbumes del usuario
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.log(error));

    // Cargar TODOs del usuario
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!user) {
    if (id === 0) {
      return <div>Seleccione un usuario para ver sus detalles</div>;
    }
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles de Usuario</h2>
      <p>Nombre: {user.name}</p>
      <p>Nombre de usuario: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Ciudad: {user.address.city}</p>
      <p>Website: {user.website}</p>
      <p>Nombre de la empresa: {user.company.name}</p>

      <h2>Álbumes</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
            {album?.photos?.length > 0 && (
              <img
                src={album.photos[0].thumbnailUrl}
                alt={`Miniatura del álbum ${album.title}`}
              />
            )}
          </li>
        ))}
      </ul>

      <h2>TODOs</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetail;
