import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import Switch from './components/Switch';


function App() {
  return (
    // para permitir usar el hook useQuery globalmente (en cualquier componente)
    <QueryClientProvider client={new QueryClient()}>
      <div className="max-w-screen-lg mx-auto p-1 bg-[#f6f3ed] pb-36">
        <FindANumber />
      </div>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}



function FindANumber() {

  return (
    <>
      <div className="sm:container sm:mx-auto sm:mt-5 sm:rounded px-2 pb-4 bg-[#f1ede3] text-gray-600 ">
        <h1 className="text-3xl font-bold underline text-center py-4">Find a number</h1>
        <p className="text-center">Find a pattern in a number you like, or when its used or expresion similars to it</p>
        <p className="text-center">you can input a integer, a decimal or even a date to get interest information about it</p>
      </div>
      <p className="text-center text-gray-500 my-2">For example try for the decimal "16.09" or the integer "444" or the date "1/2/1888"</p>

      <Switch></Switch>
    </>
  );
}

export default App;
