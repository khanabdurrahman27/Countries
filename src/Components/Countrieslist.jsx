import React from 'react'
// import countriesData from '../countriesData'
import CountryCard from './CountryCard'
import { useState, useEffect } from 'react';
import CountrieslistShimmer from './CountrieslistShimmer';

export default function Countrieslist({query}) {
  const [countriesData, setCountriesData] = useState([])
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)})
    },[])
    if (countriesData.length === 0){
      return <CountrieslistShimmer/>
    }
  return (
    <div className='countries-container'>
      {countriesData.filter((country)=>country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query) )
      .map((country)=>{
   return (<CountryCard 
   name={country.name.common}
   flag={country.flags.svg}
   population={country.population}
   region={country.region}
   capital={country.capital?.[0]}
   />)
  })}
    </div>
  )
}
