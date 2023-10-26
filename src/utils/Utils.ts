import axios from "axios";
import { OptionsType } from "../types/Options";

export const formatPrice = (value: number, currency?: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? "EUR",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    }).format(value)
}

export  const getLastYearsOptions = (nrOfYears: number): OptionsType[]  => {
    const CURRENT_YEAR: number = new Date().getFullYear();
    const optionsForSelect: OptionsType[] = [];

    // we take the last 'nrOfYears' from the current year
    // e.g.     nrOfYears = 4 -->  2023, 2022, 2021, 2020
    for (let i = 0; i < nrOfYears; i++) {
        const value = CURRENT_YEAR - i;
        optionsForSelect.push({value: value, label: value.toString()})
    }

    return optionsForSelect;
}

export const getDefaultDateFormat = (date: Date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const year = date.getFullYear();
    
    return `${day}-${monthName}-${year}`;  
}

export const base64ToArrayBuffer = (base64: string) => {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export const fetchCountryNameCodeByLatLng = async (lat: string, lng: string): Promise<[string | null, string | null]> => {
    let countryName: string | null = null;
    let countryCode: string | null = null;

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    if (response.data && response.data.status === "OK") {
        for (const result of response.data.results) {
            for (const component of result.address_components) {
                if (component.types.includes('country')) {
                    countryName = component.long_name
                    countryCode = component.short_name;
                    break;
                }
            }
        }
    }
    else {
        console.log(`Geocoding request failed for ${lat} ${lng}`);
    }

    return [countryName, countryCode]
}

export const getFileTypeColor = (fileType: string): string => {

    if (fileType === "pdf") {
        return "bg-red-500";
    }
    else if (fileType === "docx") {
        return "bg-cyan-500"
    }
    else if (fileType === "xlsx") {
        return "bg-green-500"
    }
    else if (fileType === "txt") {
        return "bg-gray-500"
    }

    return "bg-red-500";
}