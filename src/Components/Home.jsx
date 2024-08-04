
import Filter from './Filter';
import Search from './Search';
import Countrieslist from './Countrieslist';
import { useState,useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { useWindowSize } from '../hooks/useWindowSize';

function Home() {
  const [isDark] = useContext(ThemeContext)  
  const [query,setQuery] = useState('')
  const windowSize = useWindowSize()
  
  return (
    <main className={`${isDark? 'dark' :''}`}>
      
   <div className="search-filter-container"><Search setQuery={setQuery}/>
   <Filter setQuery={setQuery}/></div>
   <h1 style={{textAlign:'center'}}>
    {windowSize.width}x{windowSize.height}
   </h1>
   <Countrieslist query={query}/>
    </main>
  )
}

export default Home
