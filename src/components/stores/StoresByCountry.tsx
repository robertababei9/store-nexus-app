import React, { useEffect } from 'react';
import { Col, Row } from 'antd'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Card } from '../_shared'
import CountryFlag from '../_shared/CountryFlag/CountryFlag';
import { COUNTRY_CODE } from 'src/utils/Constants';
import { groupedStoresByCountry } from 'src/utils/mocks/stores/stores-by-country';

type CountryRowProps = {
    countryCode?: string;
    name: string;
    noStores?: number; // number of stores
    dotColor?: string;  // represented in HEX
}
const CountryRow = ({countryCode, name, noStores, dotColor = "#FF0000"}: CountryRowProps) => {

    return (
        <Row className='w-full mb-4 '>
            <Col span={9}>
                <div className='flex justify-start items-center'>
                    <CountryFlag countryCode={countryCode}/>
                    <p className='ml-2'>{name}</p>
                </div>
            </Col>

            <Col span={9}>
                <p>{noStores}</p>
            </Col>

            <Col span={6}>
                <div style={{backgroundColor: dotColor}} className="w-[10px] h-[10px] rounded-full" />
            </Col>
        </Row>
    )
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

export default function StoresByCountry() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // states
    const [map, setMap] = React.useState(null);


    const onLoad = React.useCallback(function callback(map: any) {
        map.setZoom(3);
    
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return (
        <Row className='w-full mb-4'>
            <Card className='w-full flex flex-col justify-start items-start'>
                <p className='text-base font-semibold'>All stores</p>
                <p className='text-gray-400 font-semibold mt-1'>A comprehensive view of stores across countries globally</p>

                <Row className='w-full mt-8'>
                    <Col xs={24} lg={12}>
                        <div className='w-full h-full flex flex-col items-start justift-start '>
                            <p className='text-gray-400 font-semibold mb-4'>Countries</p>

                            {
                                groupedStoresByCountry.map((country, index) => (
                                    <CountryRow 
                                        countryCode={country.countryCode} 
                                        name={country.name} 
                                        noStores={country.noStores} 
                                        dotColor={COLORS[index]}
                                    />        
                                ))
                            }
                        </div>
                    </Col>

                    <Col xs={24} lg={12} >
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
                                            groupedStoresByCountry.map((country, countryIndex) => {
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
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}
