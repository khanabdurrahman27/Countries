import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 
import './CountryDetail.css';
import { ThemeContext } from '../contexts/ThemeContext'   
import { useWindowSize } from '../hooks/useWindowSize';
import CountryDetailShimmer from './CountryDetailShimmer';


export default function CountryDetail() {
  const navigate = useNavigate();
  const countryName = new URLSearchParams(window.location.search).get('name');
  
  
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isDark] = useContext(ThemeContext)  
  const windowSize = useWindowSize()


  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const country = data[0];
          setCountryData({
            name: country.name.common,
            nativeName: country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A',
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital ? country.capital.join(', ') : 'N/A',
            flag: country.flags.svg,
            tld: country.tld ? country.tld.join(', ') : 'N/A',
            languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
            currencies: country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(', ') : 'N/A',
            borders:[]
          });
          const borders = country.borders ? country.borders : [];
          if (borders.length > 0) {
          Promise.all(borders.map((border) => 
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then((data) => data[0].name.common)
          )).then((borders) => {
            setCountryData((prevState) => ({...prevState, borders: borders }))
          })
        }
      }
      })
      .catch((error) => {
        setNotFound(true)
      });
  }, [countryName]);
  // if (countryData === 0){
  //   return <CountryDetailShimmer/>
  // }
  if (notFound) {
    return <div>Error hai be tumhare counrty fetching data me</div>
  }
  return countryData === null ? (
    'loading...'
  ) : (
    <main className={`${isDark?'dark':''}`}>
       <h1 style={{textAlign:'center'}}>
    {windowSize.width}x{windowSize.height}
   </h1>
      <div className="country-details-container">
        <span className="back-button" onClick={()=>navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString('en-IN')}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            { countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {
                countryData.borders.map((border) => <Link key={border} to={`/?name=${border}`}>{border}</Link>)
              }
            </div>}
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
