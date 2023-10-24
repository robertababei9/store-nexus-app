
type IconSvgProps = {
    width?: number,
    height?: number,
}

// ########### COUNTRIES

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
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                <path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
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
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 7410 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g></svg>

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


export const Invoice = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;


    return (
        <svg width={width} height={height} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 511.984 511.984" xmlSpace="preserve">
<path style={{fill: "#FFCE54"}} d="M85.323,0c-5.875,0-10.671,4.796-10.671,10.655v490.657c0,5.859,2.406,10.672,5.344,10.672
	c2.922,0,9.625-2.156,14.859-4.781l23.593-11.797c5.25-2.608,13.828-2.608,19.078,0l23.593,11.797
	c5.234,2.625,13.828,2.625,19.078,0l23.577-11.797c5.25-2.608,13.844-2.608,19.078,0l23.593,11.797
	c5.25,2.625,13.827,2.625,19.077,0l23.594-11.797c5.25-2.608,13.844-2.608,19.093,0l23.562,11.797c5.25,2.625,13.844,2.625,19.094,0
	l23.593-11.797c5.25-2.608,13.812-2.608,19.062,0l23.594,11.797c5.25,2.625,11.938,4.781,14.875,4.781s5.344-4.812,5.344-10.672
	V10.655C437.332,4.796,432.52,0,426.645,0C426.645,0,85.323,0,85.323,0z"/>
<g>
	<path style={{fill: "#656D78"}} d="M341.331,298.646h42.655c5.874,0,10.655-4.765,10.655-10.655c0-5.906-4.781-10.672-10.655-10.672
		h-42.655c-5.906,0-10.688,4.766-10.688,10.672C330.643,293.882,335.424,298.646,341.331,298.646z"/>
	<path style={{fill: "#656D78"}} d="M383.986,319.99h-42.655c-5.906,0-10.688,4.766-10.688,10.656s4.781,10.671,10.688,10.671h42.655
		c5.874,0,10.655-4.78,10.655-10.671S389.859,319.99,383.986,319.99z"/>
	<path style={{fill: "#656D78"}} d="M255.99,277.319H127.993c-5.906,0-10.671,4.766-10.671,10.672c0,5.891,4.765,10.655,10.671,10.655
		H255.99c5.875,0,10.656-4.765,10.656-10.655C266.645,282.085,261.863,277.319,255.99,277.319z"/>
</g>
<g>
	<path style={{fill: "#434A54"}} d="M383.986,405.316h-42.655c-5.906,0-10.688,4.766-10.688,10.671c0,5.875,4.781,10.656,10.688,10.656
		h42.655c5.874,0,10.655-4.781,10.655-10.656C394.641,410.082,389.859,405.316,383.986,405.316z"/>
	<path style={{fill: "#434A54"}} d="M170.648,405.316h-42.655c-5.906,0-10.671,4.766-10.671,10.671c0,5.875,4.765,10.656,10.671,10.656
		h42.655c5.891,0,10.672-4.781,10.672-10.656C181.32,410.082,176.538,405.316,170.648,405.316z"/>
</g>
<path style={{fill: "#656D78"}} d="M192.523,320.006v-0.016h-64.529c-5.906,0-10.671,4.766-10.671,10.656s4.765,10.671,10.671,10.671
	h64.529v-0.031c5.641-0.281,10.125-4.921,10.125-10.64C202.646,324.943,198.163,320.287,192.523,320.006z"/>
<g>
	<path style={{fill: "#F6BB42"}} d="M138.648,373.316c0,5.891-4.781,10.672-10.656,10.672c-5.906,0-10.671-4.781-10.671-10.672
		s4.765-10.672,10.671-10.672C133.868,362.644,138.648,367.426,138.648,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M181.32,373.316c0,5.891-4.781,10.672-10.672,10.672c-5.89,0-10.656-4.781-10.656-10.672
		s4.766-10.672,10.656-10.672C176.538,362.644,181.32,367.426,181.32,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M223.99,373.316c0,5.891-4.781,10.672-10.671,10.672c-5.891,0-10.672-4.781-10.672-10.672
		s4.781-10.672,10.672-10.672C219.208,362.644,223.99,367.426,223.99,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M266.645,373.316c0,5.891-4.781,10.672-10.656,10.672c-5.906,0-10.671-4.781-10.671-10.672
		s4.766-10.672,10.671-10.672C261.863,362.644,266.645,367.426,266.645,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M309.332,373.316c0,5.891-4.781,10.672-10.687,10.672c-5.875,0-10.656-4.781-10.656-10.672
		s4.781-10.672,10.656-10.672C304.551,362.644,309.332,367.426,309.332,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M351.987,373.316c0,5.891-4.781,10.672-10.656,10.672c-5.906,0-10.688-4.781-10.688-10.672
		s4.781-10.672,10.688-10.672C347.206,362.644,351.987,367.426,351.987,373.316z"/>
	<path style={{fill: "#F6BB42"}} d="M394.641,373.316c0,5.891-4.781,10.672-10.655,10.672c-5.906,0-10.656-4.781-10.656-10.672
		s4.75-10.672,10.656-10.672C389.859,362.644,394.641,367.426,394.641,373.316z"/>
</g>
<g>
	<path style={{fill: "#434A54"}} d="M280.613,68.388L280.613,68.388c-1.938-2.656-5.094-4.391-8.625-4.391
		c-5.906,0-10.672,4.766-10.672,10.655c0,2.344,0.766,4.516,2.047,6.266l-0.016,0.016l38.453,52.89l17.249-12.547L280.613,68.388z"
		/>
	<path style={{fill: "#434A54"}} d="M239.99,63.998c-3.562,0-6.687,1.734-8.625,4.391h-0.016l-38.437,52.889l17.25,12.547l38.452-52.89
		l-0.016-0.016c1.281-1.75,2.047-3.922,2.047-6.266C250.646,68.763,245.865,63.998,239.99,63.998z"/>
</g>
<polygon style={{fill: "#ED5564"}} points="319.987,223.993 191.991,223.993 170.648,117.324 341.331,117.324 "/>
<g>
	<path style={{fill: "#DA4453"}} d="M341.331,117.324H170.648c-5.89,0-10.656,4.781-10.656,10.672s4.766,10.655,10.656,10.655h170.683
		c5.875,0,10.656-4.765,10.656-10.655C351.987,122.106,347.206,117.324,341.331,117.324z"/>
	<path style={{fill: "#DA4453"}} d="M234.646,149.323c-5.891,0-10.656,4.781-10.656,10.672v31.999c0,5.891,4.766,10.656,10.656,10.656
		s10.671-4.766,10.671-10.656v-31.999C245.318,154.104,240.536,149.323,234.646,149.323z"/>
	<path style={{fill: "#DA4453"}} d="M277.332,149.323c-5.906,0-10.688,4.781-10.688,10.672v31.999c0,5.891,4.781,10.656,10.688,10.656
		c5.875,0,10.656-4.766,10.656-10.656v-31.999C287.988,154.104,283.207,149.323,277.332,149.323z"/>
</g>
</svg>
    )
}

export const DollarUp = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
        <svg width={width} height={height} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xmlSpace="preserve">
<polygon style={{fill: "#FF583E"}} points="285.932,136.192 147.708,0 9.484,136.192 68.804,136.192 68.804,322.328 226.612,322.328 
	226.612,136.192 "/>
<path style={{fill: "#32BEA6"}} d="M375.204,415.888v-95.416c-29.768-8.504-51.584-21.368-65.48-38.6
	c-13.888-17.232-20.832-38.152-20.832-62.744c0-24.904,7.848-45.808,23.568-62.744c15.72-16.92,36.624-26.672,62.744-29.264v-22.544
	h33.024v22.544c24.136,2.888,43.344,11.12,57.616,24.712c14.256,13.592,23.376,31.776,27.328,54.536l-57.616,7.52
	c-3.496-17.92-12.608-30.064-27.328-36.44v89.048c36.432,9.872,61.256,22.664,74.464,38.376
	c13.2,15.704,19.824,35.864,19.824,60.456c0,27.48-8.312,50.64-24.952,69.464c-16.624,18.824-39.728,30.36-69.336,34.616V512
	h-33.024v-41.456c-26.272-3.184-47.592-12.984-63.992-29.384c-16.4-16.384-26.88-39.536-31.432-69.456l59.448-6.376
	c2.424,12.144,6.976,22.632,13.664,31.432C359.564,405.568,366.996,411.944,375.204,415.888z M375.204,176.768
	c-8.968,3.032-16.104,8.192-21.408,15.496c-5.32,7.288-7.968,15.328-7.968,24.136c0,8.048,2.424,15.52,7.288,22.44
	c4.864,6.912,12.224,12.488,22.096,16.744v-78.816H375.204z M408.228,419.088c11.376-2.128,20.64-7.408,27.776-15.832
	c7.136-8.416,10.704-18.336,10.704-29.72c0-10.168-3-18.928-8.992-26.304c-5.992-7.36-15.824-13.008-29.488-16.968V419.088z"/>
</svg>
    )
}

export const AppLogo = (props: IconSvgProps) => {

    const {width = 24, height = 24} = props;

    return (
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 40.343 42">
			<g data-name="Ð¡Ð»Ð¾Ð¹ 2"><path fill="#2684ff" d="M20.172,27.858,13.314,21l6.858-6.858V0L.586,19.586a2,2,0,0,0,0,2.828L20.172,42s3-2,3-7A11.639,11.639,0,0,0,20.172,27.858Z"></path><path fill="#1d78f2" d="M14.385,19.667l.131.131,5.656-5.656V0L9.571,10.6A20.2,20.2,0,0,0,14.385,19.667Z"></path><path fill="#126ae5" d="M15.832,18.285l.1.1,4.242-4.242V0L11.306,8.866A18.21,18.21,0,0,0,15.832,18.285Z"></path><path fill="#0b60da" d="M20.172,14.142V0l-7,7a15.546,15.546,0,0,0,4.171,9.97Z"></path><path fill="#0154ce" d="M15.172,7c0,4.746,3.407,8.371,3.585,8.556l1.415-1.414V0L15.35,4.822A13.161,13.161,0,0,0,15.172,7Z"></path><path fill="#2482fd" d="M20.172,14.142,27.029,21l-6.857,6.858V42L39.757,22.414a2,2,0,0,0,0-2.828L20.172,0s-3,2-3,7A11.639,11.639,0,0,0,20.172,14.142Z"></path><path fill="#1d78f2" d="M25.958,22.333l-.131-.131-5.655,5.656V42l10.6-10.6A20.2,20.2,0,0,0,25.958,22.333Z"></path><path fill="#126ae5" d="M24.511,23.715l-.1-.1-4.241,4.242V42l8.866-8.866A18.216,18.216,0,0,0,24.511,23.715Z"></path><path fill="#0b60da" d="M20.172,27.858V42l7-7A15.545,15.545,0,0,0,23,25.03Z"></path><path fill="#0154ce" d="M25.172,35c0-4.746-3.407-8.371-3.586-8.556l-1.414,1.414V42l4.822-4.822A13.27,13.27,0,0,0,25.172,35Z"></path><path fill="#2684ff" d="M20.172,27.858,13.314,21H2.172v3l18,18s3-2,3-7A11.639,11.639,0,0,0,20.172,27.858Z"></path></g>
		</svg>
	)
}

export const DocumentTypeIcon = (props: IconSvgProps) => {

	const {width = 24, height = 24} = props;

	return (
		<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#808080" >
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
		</svg>
	)
}


const iconsArray = [DocumentTypeIcon, AppLogo, GermanyFlag, UnitedKingdomFlag, RomaniaFlag, UnitedStatesFlag, ItalyFlag, FranceFlag, Invoice, DollarUp];

export default iconsArray;