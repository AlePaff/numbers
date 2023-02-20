import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GetData from './components/GetData'




function App() {
  // https://www.kindacode.com/article/react-typescript-handling-form-onsubmit-event/
  const [term, setTerm] = useState('');       // State for the search term
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {     // Form submit function, returns a void
    event.preventDefault();     // Preventing the page from reloading

    // Do something 
    // alert(term);
    
  }

  return (
    <>
      <div className="container mx-auto mt-5 pb-4 bg-blue-200 text-gray-600 rounded">
        <h1 className="text-3xl font-bold underline text-center py-4">Find a number</h1>
        <p className="text-center">Find a pattern in a number you like, or when its used or expresion similars to it</p>
      </div>

      {/* https://www.kindacode.com/article/react-typescript-handling-form-onsubmit-event/ */}
      <div className="container grid place-content-center">
        <form onSubmit={submitForm} className="same-line">
          <input
            type="text"
            className="w-80 mx-auto border-2 rounded-l-md p-2 my-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder='Write here a number (eg. 16.09)' />

          <button type="submit" className="bg-purple-600 text-white rounded-r-md px-2 h-12">=</button>
        </form>

        {/* bullet points */}
        <ul className="list-disc list-inside">
          <li>Propiedades</li>
          <li>Closed forms</li>
          <li>Numerología</li>
        </ul>

        Buscador de dígitos
        {/* form */}

      </div>



      {/* closed form https://en.wikipedia.org/wiki/Closed-form_expression 
      a closed-form expression is a mathematical expression that uses a finite number of standard operations.
      It may contain constants, variables, operations and functions (eg. closed form of 16.09 => e^2pilog(2) = 16.090305)
      */}





    </>
  )
}

export default App
