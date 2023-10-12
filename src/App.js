
import { useEffect, useState } from 'react';
import './App.css';
import Nutrients from './Nutrients';
import Swal from 'sweetalert2';
import { Loader } from './Loader';



function App() {

  //creating state for input search information:
  const [ingrSearch, setIngrSearch] = useState("");

  //creating state for nutrition information:
  const [ingrNutrients, setIngrNutrients] = useState();

  //creating state for submitting a whole word, not only 1 letter for API search button:
  const [wordSubmitted, setWordSubmitted] = useState("")

  //Loader
  const [loader, setLoader] = useState(false);


  const API_ID = "897ab8d3";
  const API_KEY = "cb007024d3fbc19a495f7fec018470b2";
  const API_URL = "https://api.edamam.com/api/nutrition-details";
  //https://api.edamam.com/api/nutrition-details?app_id=e6550d1b&app_key=4fe3203573bce172fbc3364a88b4293f



  const getNutrition = async (ingrLook) => {
    setLoader(true);
    

    const response = await fetch(`${API_URL}?app_id=${API_ID}&app_key=${API_KEY}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ingr: ingrLook})
      });
  
    if(response.ok){
      setLoader(false);
      const data = await response.json();
      setIngrNutrients(data);
    }
    else{
      setLoader(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Try entering your indredients again!',
      }) 
    }
    
  }

  
  useEffect(()=>{
    if (wordSubmitted !== ""){
      let ingrLook = wordSubmitted.split(/[,,;,\n,\r]/);
      getNutrition(ingrLook);
    }
  }, [wordSubmitted])

  const myIngredientSearch = (e) => {
    setIngrSearch(e.target.value);
  }

const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(ingrSearch);
  setIngrSearch("");
}

  return (
    <div className="App">
      <p className='instructions'>Enter 1 item at a time, or whole ingredient list. 
      <br></br>
        Please use comma (" , ") to seperate items.</p>
      <div className='inputClass'>
        <form onSubmit={finalSearch}>
          <input 
          className='search' 
          placeholder='Type your ingridients...' 
          onChange={myIngredientSearch}
          spellCheck="true"
          type='text'
          lang='en'
          value={ingrSearch}/>
          <button type='submit' className='btn'>Search</button>
        </form>
      </div>


      <div className='showingCalories'>
        <p><span className="label">YOUR INGREDIENTS:</span> {wordSubmitted}</p>
      {
          ingrNutrients && <p> <span className="label">Calories:</span> {ingrNutrients.calories} kcal</p>
        }
        <hr className='underline'></hr>
      {
        ingrNutrients && Object.values(ingrNutrients.totalNutrients).map(({label, quantity, unit})=>
          <Nutrients key={label}
            label = {label}
            quantity = {quantity}
            unit = {unit}
          />
      )}
      </div>
      {loader && <Loader/>}
    </div>
  );
}

export default App;


// Задание - Создайте приложение Nutrition Analysis


// Требование к приложению:

// 1) отобразить количество калорий и totalNutrients;
// 2) добавить alert, если пользователь ввел некорректные ингредиенты в поисковой строке;
// 3) добавить лоадер на время ожидания ответа от сервера
// 4) стилизовать ваше приложение, сделать мобильную адаптацию

// ПОДСКАЗКИ:


// 1) внимательно изучите техническую документацию к API перед тем как приступать к его выполнению
// https://developer.edamam.com/edamam-docs-nutrition-api 
// Для тех, кто не знает английский рекомендую использовать мой любимый переводчик: https://www.deepl.com/translator?referrer=https%3A%2F%2Fwww.google.com%2F 


// 2) обратите внимание, что это POST запрос
// поэтому дополнительно изучите как правильно оформить POST-запрос, он немного отличается, так как необходимо использовать method  и body
// https://learn.javascript.ru/fetch?ysclid=li65qa8td1415776303 
// Не пугайтесь, ничего сложного нет, просто внимательно читаем документацию пункта POST-запрос

// 3) Обратите внимание, как в технической документации необходимо отправить список ингредиентов (это поле обязательное и должно быть передано в body - это массив данных, где кол-во и продукт является его элементом
// пример: ['2 avocado', '1 tomato'] - а пользователь пишет в поле инпут - 2 avocado, 1 tomato - поэтому вам понадобится метод split() и регулярное выражение, которое поможет преобразовать в строку в массив

// 4) Также обратите внимание, на тип данных который вернет вам API - ранее это был массив с 10 рецептами, посмотрите что вы получите в этот раз. Решить это вам поможет следующий дополнительный материал
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values 

// 5) лоадер можете использовать любой, можно взять на этом сайте
// https://loading.io/css/ 
// А вот над логикой его работы необходимо подумать

// Попробуйте создать свое приложение по аналогии с тем, что мы делали в прошлом модуле.



// import { useEffect, useState } from 'react';
// import './App.css';
// import Nutrients from './Nutrients';
// import Swal from 'sweetalert2';
// import { Loader } from './Loader';



// function App() {

//   //creating state for input search information:
//   const [ingrSearch, setIngrSearch] = useState("");

//   //creating state for nutrition information:
//   const [ingrNutrients, setIngrNutrients] = useState();

//   //creating state for submitting a whole word, not only 1 letter for API search button:
//   const [wordSubmitted, setWordSubmitted] = useState("")

//   //Loader
//   const [loader, setLoader] = useState(false);


//   const API_ID = "e6550d1b";
//   const API_KEY = "4fe3203573bce172fbc3364a88b4293f";
//   const API_URL = "https://api.edamam.com/api/nutrition-details";
//   //https://api.edamam.com/api/nutrition-details?app_id=e6550d1b&app_key=4fe3203573bce172fbc3364a88b4293f



//   const getNutrition = async (ingrLook) => {
//     setLoader(true);
    

//     const response = await fetch(`${API_URL}?app_id=${API_ID}&app_key=${API_KEY}`, 
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ingr: ingrLook})
//       });
  
//     if(response.ok){
//       setLoader(false);
//       const data = await response.json();
//       setIngrNutrients(data);
//     }
//     else{
//       setLoader(false);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong! Try entering your indredients again!',
//       }) 
//     }
    
//   }

  
//   useEffect(()=>{
//     if (wordSubmitted !== ""){
//       let ingrLook = wordSubmitted.split(",");
//       getNutrition(ingrLook);
//     }
//   }, [wordSubmitted])

//   const myIngredientSearch = (e) => {
//     setIngrSearch(e.target.value);
//   }

// const finalSearch = (e) => {
//   e.preventDefault();
//   setWordSubmitted(ingrSearch);
// }

//   return (
//     <div className="App">
//       {loader && <Loader/>}
//       <div className='inputClass'>
//         <form onSubmit={finalSearch}>
//           <input 
//           className='search' 
//           placeholder='Type your ingridients...' 
//           onChange={myIngredientSearch}
//           spellCheck="true"
//           type='text'
//           lang='en'
//           value={ingrSearch}/>
//           <button className='btn'>Search</button>
//         </form>
//       </div>


//       <div>
//       {
//           ingrNutrients && <p>{ingrNutrients.calories} kcal</p>
//         }
//       {
//         ingrNutrients && Object.values(ingrNutrients.totalNutrients).map(({label, quantity, unit, index})=>
//           <Nutrients key={index}
//             label = {label}
//             quantity = {quantity}
//             unit = {unit}
//           />
//       )}
//       </div>
//     </div>
//   );
// }

// export default App;

