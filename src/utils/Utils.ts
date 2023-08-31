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

