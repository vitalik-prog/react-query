import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Characters from './components/Posts';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1>Rick and Morty</h1>
        <QueryClientProvider client={queryClient}>
          <Characters />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
