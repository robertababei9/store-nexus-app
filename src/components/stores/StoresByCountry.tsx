import { useState, useEffect, useCallback } from 'react';
import { Col, Row } from 'antd'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Card } from '../_shared'
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { openNotification } from 'src/utils/Notification';
import { StoreLocationGroup } from 'src/types/store';
import ReactCountryFlag from 'react-country-flag';

type CountryRowProps = {
    countryCode: string;
    name: string;
    noStores?: number; // number of stores
    dotColor?: string;  // represented in HEX
}
const CountryRow = ({countryCode, name, noStores, dotColor = "#FF0000"}: CountryRowProps) => {

    return (
        <Row className='w-full mb-4 '>
            <Col span={9}>
                <div className='flex justify-start items-center'>
                    {/* <CountryFlag countryCode={countryCode}/> */}
                    <ReactCountryFlag 
                        svg
                        style={{
                            width: 30,
                            height: 30
                        }}
                        countryCode={countryCode} 
                    />
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

    // google maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // states
    const [groupedStoresData, setGroupedStoresData] = useState<StoreLocationGroup[]>([]);

    // effects
    useEffect(() => {
        fetchGroupedStoresByCountry();
    }, []);


    // helpers
    const fetchGroupedStoresByCountry = async () => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<ApiResponseModel>(`${BASE_URL}/api/stores/GetAllStoreLocationData`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            // console.log("resuuuuuuuult.data = ", result.data);
            if (result.data) {
                const { Data } = result.data;
                setGroupedStoresData(Data);
            }
        }
        catch (err: any) {
            console.log("Error while getting the store locations data: ", err);
            openNotification("error");
        }
        finally {
            // setStoresLoading(false);
        }
    }

    const onLoad = useCallback(function callback(map: any) {
        map.setZoom(3);
    
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
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
                                groupedStoresData.map((country, index) => (
                                    <CountryRow 
                                        key={country.Id + index}
                                        countryCode={country.CountryCode} 
                                        name={country.Country} 
                                        noStores={country.Stores.length} 
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
                                            groupedStoresData.map((country, countryIndex) => {
                                                return country.Stores.map((store, storeIndex) => (
                                                    <Marker
                                                        key={store.Lat + store.Lng + storeIndex}
                                                        position={{
                                                            lat: parseFloat(store.Lat) ?? 47, 
                                                            lng: parseFloat(store.Lng) ?? 21
                                                        }}
                                                        title={store.StoreName} 
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
