import { COUNTRY_CODE } from "src/utils/Constants";
import { 
    RomaniaFlag,
    GermanyFlag,
    ItalyFlag,
    UnitedKingdomFlag,
    UnitedStatesFlag,
    FranceFlag
} from 'src/components/_shared/Icons/Icons';

type CountryFlagProps = {
    countryCode?: string;
    width?: number;
    height?: number;
}

const getCountryFlagByCountryCode = ({
    countryCode = COUNTRY_CODE.Greece, width = 32, height = 32
}: CountryFlagProps) => {

    switch (countryCode) {
        case COUNTRY_CODE.Germany:
            return (<GermanyFlag width={32} height={32}/>)
        case COUNTRY_CODE.UnitedStates:
            return (<UnitedStatesFlag width={32} height={32}/>)
        case COUNTRY_CODE.France:
            return (<FranceFlag width={32} height={32}/>)
        case COUNTRY_CODE.Romania:
            return (<RomaniaFlag width={32} height={32} />)
        case COUNTRY_CODE.UnitedKingdom:
            return (<UnitedKingdomFlag width={32} height={32}/>)
        case COUNTRY_CODE.Italy:
            return (<ItalyFlag width={32} height={32}/>)
        default:
            return <></>
    }
}

export default function CountryFlag(props: CountryFlagProps) {
    
  return (
    getCountryFlagByCountryCode(props)
  )
}
