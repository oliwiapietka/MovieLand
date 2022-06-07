import './HomePage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import  NavBar from '../NavBar/NavBar';

export function HomePage() {
    const [popularMovies, setPopularMovies] = useState([]);

    const fetchPopularMovies = async () => {
        const response = await axios.get('https://api.tvmaze.com/shows?page=1').catch((err) => {
        console.log('Eror: ', err)});

        if (response) {
        setPopularMovies(response.data);
        console.log('Response: ', response.data);
        }
    };

    useEffect(() => {
      fetchPopularMovies();
    }, []);

    return (
    <div>
        <NavBar />
        <div className="home-page">
          { <> 
            {popularMovies.map((show) => (
              <div key={show.id} className='popular-movies-container'>
                <div className='popular-movie-image-container'>
                    <img className='popular-movie-image' src={show.image.original} alt='' />
                </div>
                <div className='popular-movie-name'>  
                    {show.name}
                </div>
              </div>
              ))}
              </>
              }
        </div>
    </div>
    );
    }