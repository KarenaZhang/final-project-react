import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, API_KEY } from '../config';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL
} from '../config';

import NoImage from './images/no_image.jpg';

const SearchRecorder = () => {
  const [records, setRecords] = useState([]);
  
  const username = localStorage.getItem("userName")
  useEffect(() => {
    fetchSearchRecords();
  }, [username]); // 当username变化时重新加载数据

  const fetchRecords = async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const result = await (await fetch(endpoint)).json();
    return result
  }
  const fetchSearchRecords = async () => {
    try {
      const response = await axios.get(`https://final-project-node-d408.onrender.com/search-records/${username}`);
      response.data.forEach(async element => {
        let movies = []
          if(element.search_record != null) {
            let resulr = await fetchRecords(element.search_record)
            console.log(resulr)
            movies.push(resulr)
          }
          setRecords(movies)
      });

      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching search records:', error);
    }
  };

  return (
    <div>
      {/* <h2>Search Records for {username}</h2> */}
      <Grid header={'Search Records ' + username}>
          {records.map(movie => (
            <MovieThumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
              movieName={movie.original_title}
            />
          ))}
        </Grid>
    </div>
  );
};

export default SearchRecorder;
