
type IconSvgProps = {
    width?: number,
    height?: number,
}

export const GermanyFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><path d="M0 0h5v3H0z"/><path fill="#D00" d="M0 1h5v2H0z"/><path fill="#FFCE00" d="M0 2h5v1H0z"/></svg>
    )
}

export const UnitedKingdomFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
            <clipPath id="a">
                <path d="M0 0v30h60V0z"/>
            </clipPath>
            <clipPath id="b">
                <path d="M30 15h30v15zv15H0zH0V0zV0h30z"/>
            </clipPath>
            <g clip-path="url(#a)">
                <path d="M0 0v30h60V0z" fill="#012169"/>
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/>
                <path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/>
                <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>
                <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/>
            </g>
        </svg>
    )
}

export const RomaniaFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
            <path fill="#002B7F" d="M0 0h1v2H0z"/>
            <path fill="#FCD116" d="M1 0h1v2H1z"/>
            <path fill="#CE1126" d="M2 0h1v2H2z"/>
        </svg>
    )
}

export const UnitedStatesFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 7410 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g></svg>

    )
}

export const ItalyFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><path fill="#008C45" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CD212A" d="M2 0h1v2H2z"/></svg>
    )
}

export const FranceFlag = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><path fill="#EC1920" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 0h2v2H0z"/><path fill="#051440" d="M0 0h1v2H0z"/></svg>
    )
}


export default [GermanyFlag, UnitedKingdomFlag, RomaniaFlag, UnitedStatesFlag, ItalyFlag, FranceFlag];