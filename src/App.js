import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () =>{

  const API_ID = "1e15ab06";
  const API_KEY = "d3bd5981d8282462b6f7c03d32c2b5e7";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [final, setFinal] = useState('');

  useEffect(() =>{
    getRecipes();
  }, [final]);

  const getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${final}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const changeSearch = e =>{
    setSearch(e.target.value);
  }
  const getResult = e =>{
    e.preventDefault();
    setFinal(search);
    setSearch("");
  }
  return(
    <div className = "App">
           <div class = "header">
        <h1>Kevin Tu's Recipe App</h1>
        </div>
      <form onSubmit={getResult} className = "searchForm">
        <input className = "searchbar" type = "text" value = {search} onChange={changeSearch}/>
        <button className = "searchbutton" type = "submit"> Search </button>
      </form>
      <div className= "recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        image = {recipe.recipe.image}
        calories = {Math.round(recipe.recipe.calories)}
        ingredients ={recipe.recipe.ingredients}
        />
      ))}
      </div>
      
    </div>
  )
}

export default App;
