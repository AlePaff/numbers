
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import WolframInput from './components/WolframInput';

function App() {
  return (
    // para permitir usar el hook useQuery globalmente (en cualquier componente)
    <QueryClientProvider client={new QueryClient()}>
      <Wolframe />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}



function Wolframe() {

  return (
    <>
      <div className="container mx-auto mt-5 pb-4 bg-blue-200 text-gray-600 rounded">
        <h1 className="text-3xl font-bold underline text-center py-4">Find a number</h1>
        <p className="text-center">Find a pattern in a number you like, or when its used or expresion similars to it</p>
        <p className="text-center">you can input a integer, a decimal or even a date to get interest information about it</p>
      </div>
      <WolframInput></WolframInput>
    </>
  );
}

export default App;
