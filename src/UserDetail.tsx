import React, { useEffect, useState } from "react";
import User from "./interfaces/users";
import "./UserDetail.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Button, Form, Modal } from "react-bootstrap";

interface UserDetailProps {
  id: number;
  lastClickedAlbums: any[];
}

function UserDetail({
  id,
  lastClickedAlbums: lastClickedAlbumsProp,
}: UserDetailProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState<number>(0);

  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [showPhotosDialog, setShowPhotosDialog] = useState(false);

  const [lastClickedAlbums, setLastClickedAlbums] = useState<any[]>([]);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleNewTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const handleAddTodo = () => {
    // Validar que el título del nuevo TODO no contenga números
    if (/^\D+$/.test(newTodoTitle)) {
      if (todos.length > 0) {
        console.log("Nuevo TODO agregado:", newTodoTitle);
        const newTodoId = todos[todos.length - 1].id + 1;
        setTodos([
          ...todos,
          { id: newTodoId, title: newTodoTitle, completed: false },
        ]);
      }
      handleCloseDialog();
    } else {
      // Mostrar un mensaje de error si el título contiene números
      alert("El título del TODO no debe contener números.");
    }
  };

  // Función para manejar el borrado de un TODO
  const handleDeleteTodo = (todoId: number) => {
    setShowDeleteDialog(true);
    setTodoToDeleteId(todoId);
  };

  // Función para confirmar el borrado del TODO
  const handleConfirmDelete = () => {
    if (todos.length > 0) {
      console.log("TODO borrado:", todoToDeleteId);
      setTodos(todos.filter((todo) => todo.id !== todoToDeleteId));
    }
    setShowDeleteDialog(false);
  };

  // Función para cancelar el borrado del TODO
  const handleCancelDelete = () => {
    // Cerrar el diálogo de confirmación sin borrar el TODO
    setShowDeleteDialog(false);
  };

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbumId(albumId);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLastClickedAlbums(lastClickedAlbumsProp.concat(data));
      })
      .catch((error) => console.log(error));
    setShowPhotosDialog(true);
  };

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

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "title",
      text: "Título",
      filter: textFilter(),
    },
    {
      dataField: "completed",
      text: "Completado",
      formatter: (cell: boolean) => (cell ? "Sí" : "No"),
    },
    {
      dataField: "id",
      text: "Acciones",
      formatter: (cell: any, row: any) => {
        return (
          <>
            {/* Botón de borrado */}
            <Button variant="danger" onClick={() => handleDeleteTodo(row.id)}>
              Borrar
            </Button>
          </>
        );
      },
    },
  ];

  const paginationOptions = {
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <div className="user-detail-panel">
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
            <button onClick={() => handleAlbumClick(album.id)}>
              {album.title}
            </button>
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
      <Button variant="primary" onClick={handleShowDialog}>
        Agregar TODO
      </Button>

      <Modal show={showDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTodoTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título del TODO"
                value={newTodoTitle}
                onChange={handleNewTodoTitleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
      <BootstrapTable
        keyField="id"
        data={todos}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        filter={filterFactory()}
      />
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas borrar este TODO?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPhotosDialog} onHide={() => setShowPhotosDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Fotos del Álbum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photos.map((photo) => (
            <div key={photo.id} className="photo-container">
              <img src={photo.url} alt={photo.title} className="photo" />
              <p>{photo.title}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserDetail;
