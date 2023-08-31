import { useState, useCallback }  from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { TextField, Autocomplete } from '@mui/material';
import { StoreDataType } from 'src/types/store';
import { StoresStatusToStringMap } from 'src/utils/Constants';
import TimePicker from '../_shared/TimePicker/TimePicker';
import { Col, Row } from 'antd';


type BasicInfoProps = {
    data: StoreDataType
}

export default function BasicInfo({
    data
}: BasicInfoProps) {

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
        <Row gutter={16} className='px-4'>
            <Col xs={24} lg={12} className='w-full flex flex-col'>
                <TextField  
                    style={{marginBottom: 20}}
                    label='Name' 
                    variant="outlined"
                    onChange={value => console.log("value = ", value)}
                    required
                />
                <TextField
                    style={{marginBottom: 20}}
                    label='Description' 
                    variant="outlined"
                    onChange={value => console.log("value = ", value)}
                    multiline
                    rows={3}
                    
                />
                <Autocomplete
                    style={{marginBottom: 20}}
                    disablePortal
                    options={[
                        { label: 'Robert Ababei', id: "some-guid-1" },
                        { label: 'Razvan Ababei', id: "some-guid-2" },
                        { label: 'Dinu Ababei', id: "some-guid-3" },
                        { label: 'Ioana Ababei', id: "some-guid-4" },
                    ]}
                    renderInput={(params) => <TextField {...params} label="Manager" required />}
                />

                <TextField  
                    style={{marginBottom: 20}}
                    label='Contact' 
                    variant="outlined"
                    onChange={value => console.log("value = ", value)}
                    required
                />

                <Autocomplete
                    style={{marginBottom: 20}}
                    disablePortal
                    options={
                        Object.values(StoresStatusToStringMap)
                        .map(status => ({ label: status, value: status}))
                    }
                    renderInput={(params) => <TextField {...params} label="Status" required />}
                    sx={{width: "50%"}}
                />

                <TimePicker />
            </Col>

            <Col xs={24} lg={12} className='w-full flex flex-col'>
                <TextField  
                    style={{marginBottom: 20}}
                    label='Location' 
                    variant="outlined"
                    onChange={value => console.log("value = ", value)}
                    required
                />
                {
                    isLoaded ? (
                        <div className='text-left'>
                            <p className='text-base text-gray-400 font-semibold mb-1'>Drag and drop the pin to get the exact location</p>
                            <GoogleMap
                                mapContainerStyle={{
                                    width: "100%", height: 300, display: "flex"
                                }}
                                center={{
                                    lat: 52.5200,
                                    lng: 13.4050
                                }}
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
                                <Marker
                                    // onClick={() => {}}
                                    position={{
                                        lat: 52.5200,
                                        lng: 13.4050
                                    }}
                                    draggable={true}
                                    onDragEnd={(event: any) => console.log(event)}
                                    // name={"Current location"}
                                />
                            </GoogleMap>
                        </div>
                    ) : <></>   
                }
            </Col>

            {/* Location with google maps --- with PIN on map*/}
        </Row>
    )
}
