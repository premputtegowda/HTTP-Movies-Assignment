import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Route } from 'react-router-dom';
import UpdateMovie from './UpdateMovie'

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }
 
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleEdit = (e) => {
    
    this.props.history.push(`/update-movie/${this.props.match.params.id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    console.log(this.state.movie)
    return (
      <div className="save-wrapper">
        <Route render= {props => <MovieCard {...props} movie={this.state.movie} />}/>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.handleEdit}>Edit</button>
        <button >Delete</button>
      
      

      </div>
    );
  }
}
