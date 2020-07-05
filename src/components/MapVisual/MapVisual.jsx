import React, { useState, useEffect } from "react"
import "./MapVisual.css"
import { FaMapMarker } from "react-icons/fa"
import { FaArrowCircleUp } from "react-icons/fa"
//Map stuff
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import axios from "axios"
import CountryDetails from "../CountryDetails/CountryDetails";

const MapVisual = props => {
  const [viewport, setViewport] = useState({
    latitude: 30.3308401,
    longitude: 71.247499,
    zoom: 3,
    width: "100vw",
    height: "100vh",
  })

  const [selectedRegion, setSelectedRegion] = useState(null)
  const [countries, setCountries] = useState([])

  //For escape key binding
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedRegion(null)
      }
    }
    window.addEventListener("keydown", listener)
    //removing key binding after MapVisual rendering ended
    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  useEffect(() => {
    axios
      .get("https://www.trackcorona.live/api/countries")
      .then(res => setCountries(res.data.data))
  }, [])

  //marker color based on confirmed cases
  const getColorFromCount = count => {
    if (count < 10000) {
      return "#a54242"
    } else if (count < 50000) {
      return "#ad1c1c"
    }
    return "#800404"
  }

  //Back to top button
  const [showScroll, setShowScroll] = useState(false)
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  window.addEventListener("scroll", checkScrollTop)

  const mapbox_token =
    "pk.eyJ1IjoiaGFtemFhYWFhaCIsImEiOiJja2M4cnVxZWkxZWh2MzFyaXZhYTA0cjB4In0.zRiClhOazwTF1py0xq_r8Q"

  return (
    <div className='MapContainer'>
      <div className='directions'>
        <h1>Tap on Marker  </h1>
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapbox_token}
        mapStyle='mapbox://styles/hamzaaaaah/ckc9cta2s42pz1iqh22qk7mbr'
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {countries.map(country => (
          <Marker
            latitude={country.latitude ? country.latitude : 0}
            longitude={country.longitude ? country.longitude : 0}
            key={country.updated}
          >
            <button
              className='Button'
              onClick={e => {
                e.preventDefault()
                setSelectedRegion(country)
              }}
            >
              <FaMapMarker color={getColorFromCount(country.confirmed)} />
            </button>
          </Marker>
        ))}
        {selectedRegion && (
          // to add pop on marker
          <Popup
            latitude={selectedRegion.latitude}
            longitude={selectedRegion.longitude}
            onClose={() => setSelectedRegion(null)}
          >
            <CountryDetails countryData={selectedRegion} />
          </Popup>
        )}
      </ReactMapGL>
      <FaArrowCircleUp
        className='scrollTop'
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      />
      <div className='border-line'>Developed By Ameer Hamza Sultan</div>
    </div>
  )
}

export default MapVisual;
