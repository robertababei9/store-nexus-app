import { GoogleMap, Marker, useJsApiLoader,  } from '@react-google-maps/api';
import { Button, Card } from '../../components/_shared';
import { useCallback, useEffect, useState } from 'react';
import { getDefaultApiUrl } from 'src/config';
import { GrMapLocation } from "react-icons/gr";
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { StoreLocationGroup } from 'src/types/store';
import { Tooltip } from 'antd';
import { ClipLoader } from 'react-spinners';
import { MapSettingsRequest } from 'src/types/settings';


const containerStyle = {
    width: '100%',
    height: '400px',
    display: "flex"
};
  
// const center = {
//     lat: 45.90197649317355,
//     lng: 24.931824417427624
// };
const COLORS = [
    "#FF0000", "#008000", "#0000FF", "#800080", "#FFFF00"
];

type SavePositionComponentProps = {
    onClick: () => void;
    loading?: boolean;
}
// Save position component
const SavePositionComponent = ({onClick, loading = false}: SavePositionComponentProps) => (
    
    <Tooltip 
        title={loading ? (
                <div className='flex justify-center items-center'>
                    <ClipLoader size={14} color="#FFF" />
                    <p className='ml-2'>Saving map position ...</p>
                </div> )
                : 
                "Save the current map position"}>
        
        <div className='absolute top-[10px] left-[10px] bg-white cursor-pointer p-[5px]' onClick={onClick}>
            <GrMapLocation size={28} color="#FF0000" />
        </div>
    </Tooltip>
);


export default function MapStoreCard() {

    // google maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // states
    const [groupedStoresData, setGroupedStoresData] = useState<StoreLocationGroup[]>([]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [mapSettings, setMapSettings] = useState(null);
    const [mapPositionLoading, setMapPositionLoading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        fetchGroupedStoresByCountry();
    }, []);

  
    // handlers
    const handleSaveMapWindowPosition = async () => {
        if (map) {
            const lat = map.getCenter()?.lat();
            const lng = map.getCenter()?.lng();
            const zoomLevel = map.getZoom();


            // API call to set the [ lat, lnt, zoomLevel ] for map
            try { 
                setMapPositionLoading(true);
    
                const body: MapSettingsRequest = {
                    Lat: lat?.toString() || "52.52",
                    Lng: lng?.toString() || "13.40",
                    Zoom: zoomLevel || 6
                };
                const result = await axios.post<ApiResponseModel>(`${getDefaultApiUrl()}/api/settings/SaveMapSettings`,
                    body, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    }
                    );
    
                // console.log("SaveMapSettings -> result.data = ", result.data);
                if (result.status === 200 && result.data.Success) {

                    if (result.data) {
                        const { Data } = result.data;

                        const center = {lat: parseFloat(body.Lat), lng: parseFloat(body.Lng)};
                        map.setCenter(center);
                        map.setZoom(body.Zoom);
                    }
    
                }
                else {

                }
                
            } 
            catch (err: any) {
                console.log("Error while saving the map settings: ", err);
                // openNotification("error", "Error", "Error while creating the company. Log in again and try one more time. If this error persist please contact support", 10)
            }
            finally {
                setMapPositionLoading(false);
            }


        }
    }
  
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

        }
    }

    const fetchMapSettings = async (map: google.maps.Map) => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<ApiResponseModel>(`${BASE_URL}/api/settings/GetMapSettings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            // console.log("GetMapSettings -> result.data = ", result.data);
            if (result.data) {
                const { Data } = result.data;
                
                if (map) {
                    const center = {lat: parseFloat(Data.Lat), lng: parseFloat(Data.Lng)};
                    map.setCenter(center);
                    map.setZoom(Data.Zoom);
                }
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
        setMap(map);
        fetchMapSettings(map);
    }, [])

    const onBoundsChanged = () => {
    }



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
                    //   center={center}
                    //   zoom={3}
                      onLoad={onLoad}
                      onBoundsChanged={onBoundsChanged}
                      options={{
                          mapTypeControl: false,
                        //   zoom: 3,
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
                        <SavePositionComponent 
                            onClick={handleSaveMapWindowPosition}
                            loading={mapPositionLoading} 
                        />
                  </GoogleMap>
              ) : <></>   
          }
        </div>
      </Card>
  )
}
