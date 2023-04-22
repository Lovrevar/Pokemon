import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Pokemon from './Pages/Pokemon';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const pokemonGrid = useRef(null);

  function Nav() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleButtonClick = () => {
      navigate('/Pages/About');
    }
    const handleSearch = (event) => {
      event.preventDefault();
      // Forward user to the page for the searched Pokemon
      navigate(`/Pokemon/${searchTerm}`);
      // Clear the search input
      setSearchTerm("");
    };

    return (
      <div className="nav-container">
        <Link to="/" className="nav-item">Pokedex</Link>
        <div className="search-container">
        </div>
        <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Pokemon..."
        />
        <button type="submit">Search</button>
      </form>
        <Link to="/About" className="nav-item">About</Link>
      </div>
    );
    }  
 

  // Function to fetch Pokemon data from API and update state with new data
  async function fetchPokemonData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}&sort=id`);
    const data = await response.json();
  
    // Fetch details for each pokemon including type information
    const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    }));
  
    setPokemonList(pokemonDetails);
  }

function setCurrentPage(newPage) {
  setPage(newPage);
}

 
  function handlePrevious() {
    setCurrentPage(prevPage => prevPage - 1);
  }
  function handleNext() {
    setCurrentPage(prevPage => prevPage + 1);
  }

  // Fetch Pokemon data when offset changes
  useEffect(() => {
    fetchPokemonData();
  }, [(page - 1) * limit]);

  // Update the Pokemon cards on the page when the Pokemon list changes
  useEffect(() => {
    if (pokemonList.length === 0) return;
  
    const uniquePokemonList = Array.from(new Set(pokemonList.map(pokemon => pokemon.name))).map(name => {
      return pokemonList.find(pokemon => pokemon.name === name);
    });
  
    if (pokemonGrid.current) {
      pokemonGrid.current.innerHTML = '';
    }
  
    uniquePokemonList.forEach(async (pokemon) => {
      // Create a div to hold the Pokemon card
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");
     
  
      // Set the background color of the card based on the first element type of the Pokemon
      const backgroundColor = {
        grass: "#78C850",
        fire: "#F08030",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        poison: "#A040A0",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0"
      }[pokemon.types[0].type.name];
  
      pokemonCard.style.backgroundColor = backgroundColor;
  
      // Add Pokemon image to card
      const pokemonImg = document.createElement("img");
      pokemonImg.src = pokemon.sprites.front_default;
      pokemonCard.appendChild(pokemonImg);
  
      // Add Pokemon index to card
      const pokemonIndex = document.createElement("div");
      pokemonIndex.classList.add("pokemon-index");
      pokemonIndex.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
      pokemonCard.appendChild(pokemonIndex);
  
      // Add Pokemon name to card
      const pokemonName = document.createElement("div");
      pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemonCard.appendChild(pokemonName);

     
  
      // Add the completed Pokemon card to the grid
      pokemonGrid.current.appendChild(pokemonCard);
    });
  
  }, [pokemonList]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={
            <div>
              <div ref={pokemonGrid} className="pokemon-grid"></div>
              <div className="pagination-container">
                <button className="pagination-btn previous-btn" onClick={handlePrevious}>{'<'}</button>
                <button className="pagination-btn next-btn" onClick={handleNext}>{'>'}</button>
              </div>
            </div>
          } />
          <Route path="/About" element={<About/>} />
          <Route path="/Pokemon/:searchTerm" element={<Pokemon/>}/>
        </Routes>
      </div>
    </Router>
  );
  }
export default App;
