import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolatePiYG } from "d3-scale-chromatic";
import { Button, Card } from '../../components/_shared';


function generateGdpPerCapita(geographies: any) {
  let minGdpPerCapita = Infinity;
  let maxGdpPercapita = -Infinity;
  geographies = geographies.map((geography: any) => {
    const { GDP_MD_EST, POP_EST } = geography.properties;
    const gdpPerCapita = Math.round((GDP_MD_EST * 1e6) / POP_EST);
    if (gdpPerCapita < minGdpPerCapita) {
      minGdpPerCapita = gdpPerCapita;
    }
    if (gdpPerCapita > maxGdpPercapita) {
      maxGdpPercapita = gdpPerCapita;
    }
    geography.properties.gdpPerCapita = gdpPerCapita;
    return geography;
  });
  return { minGdpPerCapita, maxGdpPercapita, modifiedGeographies: geographies };
}

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


export default function MapStoreCard() {
  return (
      <Card className='h-full !p-0'>
        <div className='flex justify-between items-center py-4 px-6'>
          <p className='font-semibold text-3xl'>Stores</p>
          <Button>Add new</Button>
        </div>

        <div className='w-full h-[2px] bg-gray-100'/>

        <div className='px-6 py-4 flex flex-col items-start'>
          <p className='mb-4 font-semibold text-gray-500'>You don't have any store yet</p>
          <ComposableMap>
            <ZoomableGroup center={[10, 50]} zoom={3}>
              <Geographies geography={geoUrl}>
                {(geoItem: any) => {
                    const { minGdpPerCapita, maxGdpPercapita, modifiedGeographies } =
                      generateGdpPerCapita(geoItem.geographies);

                    const chromaticScale = scaleSequential()
                      .domain([minGdpPerCapita, maxGdpPercapita])
                      .interpolator(interpolatePiYG);

                      return modifiedGeographies.map((geography: any) => {
                        const { gdpPerCapita, rsmKey } = geography.properties;
                        return (
                          <Geography
                            key={rsmKey}
                            geography={geography}
                            stroke="grey"
                            strokeWidth={0.5}
                            fill={chromaticScale(gdpPerCapita)}
                          />
                        );
                      });
                  }
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </Card>
  )
}
