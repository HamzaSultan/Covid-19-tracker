import React from "react"
import { Pie } from "react-chartjs-2"

const CountryDetails = ({
  countryData: { confirmed, recovered, dead, location },
}) => {
  let stillInfected = confirmed - recovered - dead

  const doughnut = (
    <Pie
      options={{ responsive: true }}
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            borderWidth: 1,
            label: ["Total Infected"],
            data: [stillInfected, recovered, dead],
            backgroundColor: ["blue", "green", "red"],
          },
        ],
      }}
    />
  )
  return (
    <div>
      {doughnut}
      <h3>{location}</h3>
    </div>
  )
}

export default CountryDetails;