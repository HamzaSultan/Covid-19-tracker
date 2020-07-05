import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

// import React from "react"
// import { Pie } from "react-chartjs-2"


// const CountryPicker= ({
//   countryData: { confirmed, recovered, dead, location },
// }) => {
//   let stillInfected = confirmed - recovered - dead

//   const doughnut = (
//     <Pie
//       options={{ responsive: true }}
//       data={{
//         labels: ["Infected", "Recovered", "Deaths"],
//         datasets: [
//           {
//             borderWidth: 1,
//             label: ["Total Infected"],
//             data: [stillInfected, recovered, dead],
//             backgroundColor: ["blue", "green", "red"],
//           },
//         ],
//       }}
//     />
//   )
//   return (
//     <div>
//       {doughnut}
//       <h3>{location}</h3>
//     </div>
//   )
// }

// export default CountryPicker;
