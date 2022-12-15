import { QueryClient, QueryClientProvider } from 'react-query'; //მეოთხე ვერსიაზე სხვა ბიბლიოთეკას იყენებს და მიაქციეთ ყურადღება
import './App.css';
import Landing from "./Landing"

const queryClient = new QueryClient() 

function App() {
  return (
    <div className='App'>
        <QueryClientProvider client={queryClient}> 
          <Landing></Landing>
      </QueryClientProvider>
    </div>
    );
   
   
}

export default App;