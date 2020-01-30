import React, { useState, useEffect }from 'react';
import axios from 'axios';


const UpdateMovie = (props) => {
    const initialData = {id:'',title:'',director:'',metascore:'',stars:[]}
    const [movieData, setMovieData] = useState(initialData)
    const id = props.match.params.id;
    console.log(id)
    
    useEffect(()=> {
        axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovieData(res.data))
      .catch(err => console.log(err.response));

    },[id])
    console.log(movieData)
    const handleSubmit = (e) => {
        e.preventDefault()
        // /api/movies/:id
        axios
        .get(`http://localhost:5000/api/movies/${id}`,movieData)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    }
    
    const handleChange = (e) => {
        e.preventDefault();
        setMovieData({...movieData, [e.target.name]:e.target.value})
    }
    return (
        <div className="saved-list">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Movie Title</label>
                <input type="text"
                        name='title'
                        onChange={handleChange}
                        value={movieData.title}

                />

                <label htmlFor="director">Director</label>
                <input type="text"
                    name='director'
                    onChange={handleChange}
                    value={movieData.director}

                />

                <label htmlFor="metascore">Metascore</label>
                <input type="text"
                    name='metascore'
                    onChange={handleChange}
                    value={movieData.metascore}

                />
                
                    
                    {/* <label htmlFor="actors">actors</label>
                        <input type="text"  name="actors" 
                        value={movie.actors.split(",")}/> */}
                        
                    
                


                <button>Update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;