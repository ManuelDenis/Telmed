// GetCategories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetCategories({ onCategoriesLoaded }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/medical/category/') // Înlocuiește cu URL-ul real al API-ului pentru categorii
      .then((response) => {
        setCategories(response.data);
        onCategoriesLoaded(response.data); // Apelăm funcția din componenta părinte cu categoriile încărcate
      })
      .catch((error) => {
        console.error('Eroare la încărcarea categoriilor:', error);
      });
  }, []);

  return null; // Nu trebuie să afișăm nimic în această componentă
}

export default GetCategories;
