import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetCategories({ onCategoriesLoaded }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/medical/category/')
      .then((response) => {
        setCategories(response.data);
        onCategoriesLoaded(response.data);
      })
      .catch((error) => {
        console.error('Eroare la încărcarea categoriilor:', error);
      });
  }, []);

  return null;
}

export default GetCategories;
