import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MovieComponent from './components/MovieComponent';
import Axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';

const API_KEY = "ec479189";
const Container = styled.div`
  display:flex;
  flex-direction:column;
`;



const Header = styled.div`
  display:flex;
  justify-content:space-between;
  flex-direction:row;
  background-color:black;
  color:white;
  align-items:center;
  padding:10px;
  font-size:25px;
  font-weight:bold;
  box-shadow:0 3px 6px 0 #555;
`;

const AppName= styled.div`
  dislay:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`;


const SearchBox = styled.div`
  display:flex;
  flex-direction:row;
  padding:10px 10px;
  background-color:white;
  border-radius:6px;
  margin-left:20px;
  width:50%;
  align-items:center;
`;

const SearchInput = styled.input`
  color:black;
  font-size:16px;
  font-weight:bold;
  border:none;
  outline:none;
  margin-left:15px
`;

const MovieListContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  padding:30px;
  justify-content:space-evenly;
`;

const Centermsg= styled.div`
  color:#663399;
  font-size:25px;
  font-weight:bold;
  text-align:center;
`;



function App() {
  
  const [searchQuery,updateSearchQuery] = useState();
  const [timeoutID, updatetimeoutID] = useState();
  const [movieList,updateMovielist] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchdata = async (searchString)=>{
    const response = await Axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovielist(response.data.Search);
  }

  const ontextChange = (event)=>{
        clearTimeout(timeoutID);
        updateSearchQuery(event.target.value);
        const timeout = setTimeout(()=> fetchdata(event.target.value),500);
        updatetimeoutID(timeout);
  }



  return (
    
      <Container>
        <Header>
          <AppName>
            React Movie App
            </AppName>
            <SearchBox>
                <SearchInput placeholder="Movie Name" value={searchQuery} onChange={ontextChange}/>
            </SearchBox>
        </Header>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}/>}
          <MovieListContainer>
          {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : <Centermsg>RESULT SHOWN HERE</Centermsg>}
          </MovieListContainer>
        </Container>
  );
}

export default App;