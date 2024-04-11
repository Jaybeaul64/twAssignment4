import React, { useState, useEffect } from 'react';

interface Movie {
  poster: string;
  title: string;
  genres: string[];
  year: number;
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteGenre, setFavoriteGenre] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchMovies(token);
      extractFavoriteGenre(token);
    }
  }, []);

  const fetchMovies = async (token: string | null) => {
    try {
      if (!token) return;
      const response = await fetch('http://localhost:8080/movies', {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched movies:", data); // Log fetched data for debugging
        setMovies(data);
      } else {
        throw new Error('Failed to fetch movies');
      }
    } catch (error) {
      console.error(error);
      // Handle error, e.g., redirect to login page
    }
  };

  const extractFavoriteGenre = (token: string | null) => {
    try {
      if (!token) return;
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
      if (decodedToken.favoriteGenre) {
        setFavoriteGenre(decodedToken.favoriteGenre);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <header style={{ position: 'absolute', top: '0', right: '0' }}>
        <button type="button" onClick={handleLogOut}>Log out</button>
      </header>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Our Movies</h1>
        <h2>Your favorite movie genre: {favoriteGenre}</h2>
      </div>
      <div style={{ textAlign: 'center', overflowY: 'scroll', maxHeight: '70vh' }}>
        {movies.map((movie, index) => (
          <div key={index} style={{ marginRight: '20px', marginBottom: '20px', display: 'inline-block' }}>
            <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: '150px' }} />
            <div>{movie.title}</div>
            <div>{movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}</div>
            <div>{movie.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
