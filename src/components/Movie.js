import React, { Component } from 'react';

import { API_URL, API_KEY } from '../config';
import axios from 'axios';

// Components
import Navigation from './elements/Navigation';
import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Actor from './elements/Actor';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';
import Comment from './Comment'

class Movie extends Component {
  state = { loading: true };

  saveRecoder = async (movieId) =>{
    let username = localStorage.getItem("userName")
    await axios.post('http://localhost:8080/add-search-record', { username,searchRecord:movieId});
    console.log("save ...")
  }

  fetchData = async () => {
    const { movieId } = this.props; 
    this.saveRecoder(movieId)
    this.setState({ loading: true, error: false });
    // console.log(movieId)
    try {
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
      const result = await (await fetch(endpoint)).json();

      const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      const creditsResult = await (await fetch(creditsEndpoint)).json();
      const directors = creditsResult.crew.filter(
        member => member.job === 'Director',
      );

      this.setState(
        {
          ...result,
          actors: creditsResult.cast,
          directors,
          loading: false,
          movieId:movieId
        },
        () => {
          localStorage.setItem(movieId, JSON.stringify(this.state));
        },
      );
    } catch (error) {
      this.setState({ error: true });
    }
  };

  componentDidMount() {
    const { movieId } = this.props;
    
    if (localStorage[movieId]) {
      this.setState(JSON.parse(localStorage[movieId]));
    } else {
      this.fetchData();
    }
  }

  render() {
    const {
      original_title: originalTitle,
      runtime,
      budget,
      revenue,
      actors,
      error,
      loading,
      movieId
    } = this.state;
    // console.log(this.state)
    if (error) return <div>Something went wrong ...</div>;
    if (loading) return <Spinner />;

    return (
      <>
        <Navigation movie={originalTitle} />
        <MovieInfo movie={this.state} />
        <MovieInfoBar time={runtime} budget={budget} revenue={revenue} />
        <Grid header="Actors">
          {actors.map(actor => (
            <Actor key={actor.credit_id} actor={actor} />
          ))}
        </Grid>

        <Comment movieId={movieId} />
         
      </>
    );
  }
}

export default Movie;
