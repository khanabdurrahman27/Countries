import './App.css';
import { Outlet } from 'react-router';
import Header from './Components/Header';
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
 
  return (
    <ThemeProvider>
    <Header />
    <Outlet />
  </ThemeProvider>

  );
}

export default App;
