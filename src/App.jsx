import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Importa el componente Modal
import './App.css';

const App = () => {
  const urlBase = 'https://www.googleapis.com/youtube/v3/search';
  const API_KEY = 'AIzaSyBm6fzFlzwXuHQ8hLwYjlIB_kSi7QHlLI0'; // Reemplaza con tu clave de API

  const [busqueda, setBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?part=snippet&q=${busqueda}&maxResults=12&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPeliculas(data.items || []);
    } catch (error) {
      console.error('Ha ocurrido un error: ', error);
    }
  };

  const abrirModal = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const cerrarModal = () => {
    setSelectedVideoId(null);
  };

  useEffect(() => {
    // Cargar sugerencias de YouTube al cargar la página
    fetchPeliculas();
  }, []); // El segundo argumento vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className="container">
      <h1 className="title">TU MÚSICA TU ESTILO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="¿Qué quieres ver?"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id.videoId} className="movie-card">
            <img
              src={pelicula.snippet.thumbnails.medium.url}
              alt={pelicula.snippet.title}
            />
            <h2>{pelicula.snippet.title}</h2>
            <button onClick={() => abrirModal(pelicula.id.videoId)}>
              Ver video
            </button>
          </div>
        ))}
      </div>
      {selectedVideoId && <Modal videoId={selectedVideoId} onClose={cerrarModal} />}
    </div>
  );
};

export default App;



