import { useState, useCallback, useEffect }  from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { TextField, Autocomplete } from '@mui/material';
import { CreateStoreFormType } from 'src/types/store';
import TimePicker from '../../_shared/TimePicker/TimePicker';
import { Avatar, Col, Row } from 'antd';
import { Controller, UseFormReturn } from 'react-hook-form';
import axios from 'axios';
import { ApiResponseModel, OptionType } from 'src/types/_shared';
import { getDefaultApiUrl } from 'src/config';
import { renderStoreStatusTag } from '../Utils';
import dayjs from 'dayjs';
import { fetchCountryNameCodeByLatLng } from 'src/utils/Utils';
import { LoadingWrapper } from '../../_shared';

type BasicInfoProps = {
    methods?: UseFormReturn<CreateStoreFormType, any, undefined>,
}

export default function BasicInfo({
    methods
}: BasicInfoProps) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // states
    const [map, setMap] = useState(null);
    const [managersOptions, setManagersOptions] = useState<OptionType[]>([]);
    const [managersOptionsLoading, setManagersOptionsLoading] = useState<boolean>(true);
    const [storeStatusOptions, setStoreStatusOptions] = useState<OptionType[]>([]);
    const [storeStatusOptionsLoading, setStoreStatusOptionsLoading] = useState<boolean>(true);
    const [countryInfoLoading, setCountryInfoLoading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        fetchManagers();
        fetchStoreStatuses();
    }, []);

    // helpers
    const fetchManagers = async () => {
        try {
            const result = await axios.get<ApiResponseModel>(getDefaultApiUrl() + "/api/users/GetAllManagersOptions", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            });
            // console.log("result", result);
      
            if (result.data.Success) {
                const { Data } = result.data;
                setManagersOptions(Data);
            }
        }
        catch(error: any) {
            console.log("Error while fetching managers: ", error);
        }
        finally {
            setManagersOptionsLoading(false);
        }
    }

    const fetchStoreStatuses = async () => {
        try {
            const result = await axios.get<ApiResponseModel>(getDefaultApiUrl() + "/api/stores/GetStoreStatuses", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            });
            // console.log("result", result);
      
            if (result.data.Success) {
                const { Data } = result.data;
                setStoreStatusOptions(Data);
            }
        }
        catch(error: any) {
            console.log("Error while fetching store statuses: ", error);
        }
        finally {
            setStoreStatusOptionsLoading(false);
        }
    }

    const onLoad = useCallback(function callback(map: any) {
        map.setZoom(3);
    
        setMap(map)
    }, [])


    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    // handlers

    // helpers
    const getLocationLatLng = (): [number, number] => {
        let lat = 52.5200;
        let lng = 13.4050;

        const coordinates = methods?.getValues("LatLng").split(" ");
        if (coordinates) {
            lat = parseFloat(coordinates[0]);
            lng = parseFloat(coordinates[1]);
        }

        return [lat, lng];
    }


    return (
        <div className='w-full flex flex-col'>

            <Row gutter={16} className=''>
                <Col xs={24} lg={12} className='w-full flex flex-col'>

                    <Controller
                        name={`Id`}
                        control={methods?.control}
                        rules={{
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <input value={value || ""} onChange={onChange} className='hidden'/>
                        )}
                    />

                    <Controller
                        name={`Name`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 15 }}
                                label='Name'
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                error={error !== undefined}
                                required
                            />
                        )}
                    />

                    <Controller
                        name={`Description`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 15 }}
                                label='Description'
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                error={error !== undefined}
                                multiline
                                rows={2}
                            />
                        )}
                    />

                    <Controller
                        name={`ManagerId`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Autocomplete
                                style={{marginBottom: 20}}
                                disablePortal
                                loading={managersOptionsLoading}
                                options={managersOptions}
                                onChange={(event: any, selected: OptionType | null) => {
                                    onChange(selected?.value);
                                }}
                                value={managersOptions.find(x => x.value == value) || null}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        label="Manager" 
                                        required
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4"/>
                                            )
                                        }} 
                                    />
                                }
                                renderOption={(props: object, option: OptionType) => {
                                    return (
                                        <div 
                                            {...props} 
                                            key={option.value} 
                                            className={`flex justify-start items-center mx-2 rounded-lg 
                                            px-3 py-1 cursor-pointer hover:bg-secondary/10
                                            ${value == option.value ? "bg-secondary/10" : ""}
                                            `}
                                        >
                                                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4"/>
                                                <p className='text-xl text-gray-600'>{option.label}</p>
                                        </div>
                                    )
                                }}
                            />
                        )}
                    />

                    <Controller
                        name={`Contact`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 15 }}
                                label='Contact'
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                error={error !== undefined}
                                required
                            />
                        )}
                    />

                    <Controller
                        name={`StoreStatusId`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Autocomplete
                                style={{marginBottom: 20}}
                                disablePortal
                                options={storeStatusOptions}
                                loading={storeStatusOptionsLoading}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        label="Status" 
                                        error={error != undefined}
                                        required

                                    />

                                }
                                sx={{width: "50%"}}
                                onChange={(event: any, selected: OptionType | null) => {
                                    onChange(selected?.value);
                                }}
                                value={storeStatusOptions.find(x => x.value == value) || null}
                                renderOption={(props: any, option: OptionType, state: any) => {
                                    // console.log(props, option, state);
                                    return (
                                        <div {...props} key={option.value} className='flex justify-start items-center mx-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-secondary/10'>
                                            {renderStoreStatusTag(option.label)}
                                        </div>
                                    );
                                }}
                            />
                        )}
                    />

                    <Controller
                        name={`WorkingHours`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TimePicker 
                                onChange={(timeRange: any) => {
                                    // console.log("TimeRange 123 = ", timeRange);
                                    const startHours = timeRange[0].format("HH:mm");
                                    const endHours = timeRange[1].format("HH:mm");

                                    onChange(`${startHours} - ${endHours}`);
                                }}
                                value={
                                    [dayjs(value.split("-")[0], "HH:mm"), 
                                    dayjs(value.split("-")[1], "HH:mm")]
                                }   // format is "08:00 - 22:00" -> and we convert it to tuple of dayjs
                            />
                        )}
                    />

                </Col>

                <Col xs={24} lg={12} className='w-full flex flex-col'>
                    <Controller
                        name={`Location`}
                        control={methods?.control}
                        rules={{
                            required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 15 }}
                                label='Location'
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                error={error !== undefined}
                                required
                            />
                        )}
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
                                        position={{
                                            lat: getLocationLatLng()[0],
                                            lng: getLocationLatLng()[1]
                                        }}
                                        draggable={true}
                                        onDragEnd={async (event: any) => {
                                            const lat = event.latLng.lat();
                                            const lng = event.latLng.lng();

                                            // getting Country Name & Code based on lat lng
                                            try {
                                                // setCountryInfoLoading(true);
                                                const countryInfo = await fetchCountryNameCodeByLatLng(lat, lng);
                                                if (countryInfo[0] && countryInfo[1]) {
                                                    methods?.setValue("Country", countryInfo[0]);
                                                    methods?.setValue("CountryCode", countryInfo[1]);
                                                }
                                            }
                                            catch(error: any) {
                                                console.log(`Error while getting the country for ${lat}, ${lng}`, error);
                                            }
                                            finally{
                                                // setCountryInfoLoading(false);
                                            }

                                            methods?.setValue("LatLng" ,`${lat} ${lng}`);
                                        }}
                                    />
                                </GoogleMap>

                            </div>
                        ) : <></>   
                    }
                </Col>

                {/* Location with google maps --- with PIN on map*/}
            </Row>
        </div>
    )
}
