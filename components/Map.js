import { useState } from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter  from 'geolib/es/getCenter';

function Map({searchResults}) {
    const [selectedLocation,setSelectedLocation] = useState({})
    
    const coordinates = searchResults.map((results) => ({
        longitude: results.long,
        latitude: results.lat,
    }))
     
    const center = getCenter(coordinates);
    const [viewport,setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:  11,
    })

    

    return <ReactMapGL
    mapStyle='mapbox://styles/aanchalgaurh/ckt51wwpk1mfp17o521fjfeiv'
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport)=> setViewport(nextViewport)}
    >
        {searchResults.map(results => (
            <div key={results.long}>
                <Marker
                longitude={results.long}
                latitude={results.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p role="img" onClick={()=>setSelectedLocation(results)} className="cursor-pointer text-2xl animate-bounce"
                    aria-label="push-pin">
                     📌
                    </p>
                </Marker>
                {selectedLocation.long === results.long ? (
                    <Popup onClose={() => setSelectedLocation({})} closeOnClick={true}
                    latitude={results.lat}
                    longitude={results.long}
                    >
                        {results.title}
                    </Popup>
                ):(
                    false
                )}
            </div>
        ))}

    </ReactMapGL>
}

export default Map
