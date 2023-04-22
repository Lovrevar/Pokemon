import React, { useState, useEffect } from 'react';
import './Pokemon.css';
import { Navigate, useParams } from 'react-router-dom';

function Pokemon({}) {
  const [pokemon, setPokemon] = useState(null);
  const {searchTerm} = useParams(); 
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
      })
      .catch(error => console.log(error));
  }, [apiUrl]);
 
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const name = pokemon.name;
  const type = pokemon.types[0].type.name;
  const hp = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;
  const specialAttack = pokemon.stats[3].base_stat;
  const specialDefense = pokemon.stats[4].base_stat;
  const speed = pokemon.stats[5].base_stat;
  const ability = pokemon.abilities[0].ability.name;
  const hiddenAbility = pokemon.abilities[1]?.ability.name;

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
  } 

  const backgroundColorStats = {
    grass: "#78C850", //Ovdje treba na svaku stavit nijansu svjetlije
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
  } 
  const statsStyle = {
    backgroundColor: backgroundColor[type.toLowerCase()]
    }
  const imageStyle=
  {
    backgroundColor:backgroundColorStats[type.toLowerCase()]
  }
  

  return (
    <div className="pokemon-card ">
  <div className="pokemon-card__image-container container-fix">
    <img
      className="pokemon-card__image"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchTerm}.png`}
      alt={name}
    />
  </div>
  <div className="pokemon-card__info container-fix"  style={statsStyle} >
    <h2 className="pokemon-card__name">{name}</h2>
    <div className="pokemon-card__types">
      <span className={`pokemon-card__type pokemon-card__type--${type.toLowerCase()}`}>{type} </span>
    </div>
    <div className="pokemon-card__stats">
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">HP </span>
        <span className="pokemon-card__stat-value">{hp}</span>
      </div>
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">Attack </span>
        <span className="pokemon-card__stat-value">{attack}</span>
      </div>
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">Defense </span>
        <span className="pokemon-card__stat-value">{defense}</span>
      </div>
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">Special Attack </span>
        <span className="pokemon-card__stat-value">{specialAttack}</span>
      </div>
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">Special Defense </span>
        <span className="pokemon-card__stat-value">{specialDefense}</span>
      </div>
      <div className="pokemon-card__stat">
        <span className="pokemon-card__stat-label">Speed </span>
        <span className="pokemon-card__stat-value">{speed}</span>
      </div>
    </div>
    <div className="pokemon-card__abilities" style={statsStyle}>
      <h4 className="pokemon-card__ability">
        <span className="pokemon-card__label" >Ability:</span> {ability}
      </h4>
      {hiddenAbility && (
        <h4 className="pokemon-card__ability">
          <span className="pokemon-card__label">Hidden Ability:</span> {hiddenAbility}
        </h4>
      )}
    </div>
  </div>
</div>

  );
}

export default Pokemon;
