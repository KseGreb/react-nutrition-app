
import { useEffect } from 'react';
import './App.css';



function App() {

  const API_ID = "e6550d1b";
  const API_KEY = "4fe3203573bce172fbc3364a88b4293f";
  const API_URL = "https://api.edamam.com/api/nutrition-details";
  //https://api.edamam.com/api/nutrition-details?app_id=e6550d1b&app_key=4fe3203573bce172fbc3364a88b4293f


  
  useEffect(()=>{
    
    const getNutrition = async () => {
  
      const response = await fetch(`${API_URL}?app_id=${API_ID}&app_key=${API_KEY}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify()
        });
    
    const data = await response.json();
    console.log(data)
  }
    getNutrition();
    
  }, [])

  return (
    <div className="App">
      <p>nutrition</p>
    </div>
  );
}

export default App;
