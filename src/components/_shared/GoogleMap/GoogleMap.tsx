import { Fragment, useState, useCallback }  from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GroupedStoresByCountryType } from 'src/types/store';



type GoogleMapComponentProps = {
    groupedStoresByCountry: GroupedStoresByCountryType[]
}

const containerStyle = {
    width: '100%',
    height: '400px',
    display: "flex"
};
  
const center = {
    lat: 52.5200,
    lng: 13.4050
};

const COLORS = [
    "#FF0000", "#008000", "#0000FF", "#800080", "#FFFF00"
];

export default function GoogleMapComponent({
    groupedStoresByCountry
}: GoogleMapComponentProps) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // states
    const [map, setMap] = useState(null);


    const onLoad = useCallback(function callback(map: any) {
        map.setZoom(3);
    
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])


    return (
        <Fragment>
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={3}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            mapTypeControl: false,
                            zoom: 3,
                            minZoom: 2,
                            maxZoom: 18,

                        }}
                        >
                            {
                                groupedStoresByCountry.map((country: GroupedStoresByCountryType, countryIndex: number) => {
                                    return country.coordinates.map((coordinates, coordinatesIndex) => (
                                        <Marker
                                            position={coordinates}
                                            title={country.name} 
                                            icon={{
                                                path: google.maps.SymbolPath.CIRCLE,
                                                scale: 6,
                                                fillColor: COLORS[countryIndex],
                                                fillOpacity: 1,
                                                strokeColor: "#FFF",
                                                strokeWeight: 0
                                            }}
                                            
                                        />
                                    ))
                                })
                            }
                    </GoogleMap>
                ) : <></>   
            }
        </Fragment>
    )
}
