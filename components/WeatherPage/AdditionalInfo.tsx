import React from 'react';
import Image from 'next/image';

import { Weather } from '@/interfaces/weather';
import { format, parseISO } from 'date-fns';
import getCurrentIndex from '@/utils/getCurrentIndex';
import mToKm from '@/utils/mToKm';
import getUvLevel from '@/utils/getUvLevel';

interface CurrentWeatherInfoProps {
  weatherData: Weather;
}

export default function AdditionalInfo({
  weatherData,
}: CurrentWeatherInfoProps) {
  const idx = getCurrentIndex(weatherData);

  const Wind = (): JSX.Element => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-1">
        <h3 className="heading-3">Wind Speed</h3>
        <div className="h-full w-full flex flex-col justify-center items-center gap-1 glass p-4 rounded-md">
          <Image src={'/weather/wind.svg'} alt="Wind" width={80} height={80} />
          <p className="text-xl">
            {weatherData.current_weather.windspeed} km/h
          </p>
          <Image
            style={{
              transform:
                'rotate(' + weatherData.current_weather.winddirection + 'deg)',
            }}
            src={'/weather/winddir.svg'}
            alt="Wind Direction"
            width={20}
            height={20}
          />
        </div>
      </div>
    );
  };
  const Humidity = (): JSX.Element => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-1">
        <h3 className="heading-3">Humidity</h3>
        <div className="h-full w-full flex flex-col justify-center items-center gap-1 glass p-4 rounded-md">
          <Image
            src={'/weather/humidity.svg'}
            alt="Humidity"
            width={80}
            height={80}
          />
          <p className="text-xl">
            {weatherData.hourly.relativehumidity_2m[idx]} %
          </p>
        </div>
      </div>
    );
  };
  const SunsetSunrise = (): JSX.Element => {
    return (
      <div className="h-full w-full flex md:flex-col flex-row col-span-2 md:col-span-1 justify-center items-center gap-2">
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h3 className="heading-3">Sunrise</h3>
          <div className="w-full flex justify-center items-center gap-2 glass p-4 rounded-md">
            <Image
              src={'/weather/sunrise.svg'}
              alt="Sunrise"
              width={40}
              height={40}
            />
            <p className="text-lg">
              {format(parseISO(weatherData.daily.sunrise[0]), 'HH:mm')}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h3 className="heading-3">Sunset</h3>
          <div className="w-full flex justify-center items-center gap-2 glass p-4 rounded-md">
            <Image
              src={'/weather/sunset.svg'}
              alt="Sunset"
              width={40}
              height={40}
            />
            <p className="text-lg">
              {format(parseISO(weatherData.daily.sunset[0]), 'HH:mm')}
            </p>
          </div>
        </div>
      </div>
    );
  };
  const MoreData = (): JSX.Element => {
    const data = {
      'Dew point': `${weatherData.hourly.dewpoint_2m[idx]} °C`,
      Pressure: `${weatherData.hourly.surface_pressure[idx]} hPa`,
      Visibility: `${mToKm(weatherData.hourly.visibility[idx])} km`,
      'UV index': `${weatherData.hourly.uv_index[idx]} (${getUvLevel(
        weatherData.hourly.uv_index[idx]
      )})`,
      'Feels like': `${weatherData.hourly.apparent_temperature[idx]} °C`,
    };
    return (
      <ul className="col-span-2 grid grid-cols-2 justify-start items-start gap-2 h-full">
        {Object.entries(data).map(([key, value]) => (
          <li
            key={key}
            className="flex flex-col justify-center items-center gap-1 glass p-1 rounded-md h-full last:col-span-2"
          >
            {key}
            <span className="font-semibold">{value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full flex col-span-2 flex-col justify-center items-center gap-2">
      <h2 className="heading-2">Additional Information</h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-5 justify-center items-start gap-4 glass p-4 rounded-md">
        <Wind />
        <Humidity />
        <SunsetSunrise />
        <MoreData />
      </div>
    </div>
  );
}
