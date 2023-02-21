import React, { useState, useEffect } from 'react';


//from https://reactjs.org/docs/faq-ajax.html
function GetData(props: any) {
  var api_id = "XLPLQ9-WVTJ4GL8WU";
  var link = "http://api.wolframalpha.com/v2/query?appid=" + api_id;

  
  
  
  var formas_cerradas = 'https://api.wolframalpha.com/v2/query?input=closed+forms+of+' + props.input_numero + '&format=plaintext&output=JSON&appid=' + api_id;
  
  console.log(formas_cerradas)


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means this useEffect will run once similar to componentDidMount()
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(formas_cerradas)
      .then(res => res.json())    //convierte la respuesta a json
      .then((result) => {       //result es el json
        setIsLoaded(true);      //cambia el estado de isLoaded a true
        setItems(result);       //cambia el estado de items a lo que devuelve la api
      },
        // Note: it's important to handle errors here instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);      //cambia el estado de isLoaded a true
          setError(error);      //cambia el estado de error a lo que devuelve la api
        }
      )
  }, [])

  console.log(formas_cerradas)

  //chequeos en base al response de la api
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        
        {console.log(items.queryresult)}
        {/* {items.queryresult.pods[0].title} */}
        
      </div>
    );
  }

}

export default GetData;