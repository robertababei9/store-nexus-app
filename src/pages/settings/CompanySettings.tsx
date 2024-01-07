import { TextField } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { fetchCountryNameCodeByLatLng } from 'src/utils/Utils';
import { Button } from "src/components/_shared";



type CompanySettingsFormType = {
    companyName: string;
    noEmployees: number;
    type: string;
    phoneNo: string;
    location: string;
    email: string;

    // Location props
    Country: string;
    CountryCode: string;
    Location: string;
    LatLng: string;
}

export type StoreLocationInfo = {
    StoreName: string;
    Lat: string;
    Lng: string;
}

export default function CompanySettings() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "GOOGLE-API-KEY-NOT-SET"
    })

    // form
    const methods = useForm<CompanySettingsFormType>();

    //states
    const [map, setMap] = useState(null);


    // helpers
    const getLocationLatLng = (): [number, number] => {
        let lat = 52.5200;
        let lng = 13.4050;

        const latLngValue = methods?.getValues("LatLng");

        if (latLngValue) {
            const coordinates = latLngValue.split(" ");
            if (coordinates.length === 2) {
                lat = parseFloat(coordinates[0]);
                lng = parseFloat(coordinates[1]);
            } else {
                console.error("Invalid LatLng format");
            }
        } else {
            console.error("LatLng field is undefined or empty");
        }

        return [lat, lng];
    }

    const onLoad = useCallback(function callback(map: any) {
        map.setZoom(3);

        setMap(map)
    }, [])


    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return (

        <div className='mx-4 relative'>
            <div className="text-left text-xl font-semibold mb-1">
                Company Information
            </div>
            <hr className="w-full border-gray-300 mb-3" />

            <Row gutter={16}>
                <Col xs={24} lg={12} className='w-full flex flex-col'>
                    <Controller
                        name={'companyName'}
                        control={methods.control}
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
                                label='Company Name'
                                variant="outlined"
                                value={value}
                                onChange={(event) => {
                                    onChange(event.target.value);
                                }}
                                error={error?.message !== undefined}
                                size='medium'
                                required
                            />
                        )}
                    />

                    <Controller
                        name={`noEmployees`}
                        control={methods.control}
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
                                label='How many employees the company has ?'
                                variant="outlined"
                                type='number'
                                value={value}
                                onChange={(event) => {
                                    onChange(event.target.value);
                                }}
                                error={error?.message !== undefined}
                                size='medium'
                                required
                            />
                        )}
                    />

                    <Controller
                        name={`type`}
                        control={methods.control}
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
                                label="What's the type of business ?"
                                variant="outlined"
                                value={value}
                                onChange={(event) => {
                                    onChange(event.target.value);
                                }}
                                error={error?.message !== undefined}
                                size='medium'
                                required
                            />
                        )}
                    />

                    {/* <Controller
                        name={'email'}
                        control={methods.control}
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
                                label='E-mail address'
                                variant="outlined"
                                value={value}
                                onChange={(event) => {
                                    onChange(event.target.value);
                                }}
                                error={error?.message !== undefined}
                                size='medium'
                                required
                            />
                        )}
                    />

                    <Controller
                        name={`phoneNo`}
                        control={methods.control}
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
                                label='Phone number'
                                variant="outlined"
                                type='number'
                                value={value}
                                onChange={(event) => {
                                    onChange(event.target.value);
                                }}
                                error={error?.message !== undefined}
                                size='medium'
                                required
                            />
                        )}
                    /> */}
                </Col>


                {/* /////////////////// */}
                <Col xs={24} lg={12} className='w-full flex flex-col'>
                    <Controller
                        name={`location`}
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

                    {/* {
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
                                            catch (error: any) {
                                                console.log(`Error while getting the country for ${lat}, ${lng}`, error);
                                            }
                                            finally {
                                                // setCountryInfoLoading(false);
                                            }

                                            methods?.setValue("LatLng", `${lat} ${lng}`);
                                        }}
                                    />
                                </GoogleMap>

                            </div>
                        ) : <></>
                    } */}
                </Col>
                {/* Location with google maps --- with PIN on map*/}
            </Row>

            <div className="text-left text-xl font-semibold mb-1">
                General Settings
            </div>
            <hr className="w-full border-gray-300 mb-3" />

            <Row gutter={16}>
                <Col xs={24} lg={12} className='w-full flex flex-col'>
                    <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='Some links here maybe'
                        variant="outlined"
                        multiline
                        rows={2}
                    />
                </Col>
                
                {/* /////////////////// */}
                <Col xs={24} lg={12} className='w-full flex flex-col'>
                    <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='Description'
                        variant="outlined"
                        multiline
                        rows={2}
                    />
                </Col>

                {/* <div className="pt-5 text-left">
                {
                  editable && (
                    <Button type="secondary" onClick={handleSaveClick} loading={buttonLoading}>
                      Change Details
                    </Button>
                  )
                }
              </div> */}

            </Row>

        </div>
    )
}
