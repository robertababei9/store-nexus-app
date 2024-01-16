import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button, Card } from '../../components/_shared';
import { useCallback, useEffect, useState } from 'react';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { StoreLocationGroup } from 'src/types/store';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

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

export default function MapStoreCard() {

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
              // openNotification("error");
          }
          finally {
              // setStoresLoading(false);
          }
      }

  const onLoad = useCallback(function callback(map: any) {
    // map.setZoom(3);

}, [])

  const onUnmount = useCallback(function callback(map: any) {
  }, [])

  return (
      <Card className='h-full !p-0'>
        <div className='flex justify-between items-center py-4 px-6'>
          <p className='font-semibold text-2xl'>Stores</p>
          <Button>Add new</Button>
        </div>

        <div className='w-full h-[2px] bg-gray-100'/>

        <div className='px-6 py-4 flex flex-col items-start'>
          
          {
            groupedStoresData.length == 0 && (
              <p className='mb-4 font-semibold text-gray-500'>You don't have any store yet. Click the button to start adding</p>
            )
          }

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
        </div>
      </Card>
  )
}
