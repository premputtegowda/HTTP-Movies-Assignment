import React, { useState, useEffect }from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
const initialData = {
    id:'',
    title:'',
director: '',
metascore:'',
stars:[]
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialData)
    const {id} = useParams();
    let history = useHistory();
    console.log(history)
    const movieData = () => {
        if (props.movies) {
            const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);
            setMovie(movieToUpdate);
            

        }
    }
    
    useEffect(movieData,[props.movies]);
    console.log(movie)
    const handleSubmit = (e) => {
        e.preventDefault()
        // /api/movies/:id
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`,movie)
        .then(res => {
            const moviesArr = props.movies.filter(movie => movie.id !== res.data.id)
            props.setMovies([...moviesArr, res.data])
            history.push(`/movies/${movie.id}`)
        })
        .catch(err => console.log(err));

    }

    const actors = movie.stars.toString()
    console.log('actors: ', actors)
    
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name ==='stars'){
            const starValue = e.target.value.split(",")
            setMovie({...movie, stars: starValue })
        } else {
        setMovie({...movie, [e.target.name]:e.target.value})
        }
    }
    return (
        <div className="saved-list">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Movie Title</label>
                <input type="text"
                        name='title'
                        onChange={handleChange}
                        value={movie.title}

                />

                <label htmlFor="director">Director</label>
                <input type="text"
                    name='director'
                    onChange={handleChange}
                    value={movie.director}

                />

                <label htmlFor="metascore">Metascore</label>
                <input type="text"
                    name='metascore'
                    onChange={handleChange}
                    value={movie.metascore}

                />
                
                    
                <label htmlFor="stars">actors</label>
                    <input type="text"  
                    name="stars" 
                    onChange={handleChange}
                    value={actors}/>
                        
                    
                


                <button>Update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;