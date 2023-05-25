import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";

import getWeatherIconPath from "@/utils/getWeatherIconPath";
import getWeatherCondition from "@/utils/getWeatherCondition";
import { Weather } from "@/interfaces/weather";

interface CurrentWeatherProps {
  weatherData: Weather;
}

export default function CurrentWeather({ weatherData }: CurrentWeatherProps) {
  const date = format(
    parseISO(weatherData.current_weather.time),
    "MMMM do, EEEE"
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h2 className="heading-2">{date}</h2>

      {/* Current weather + icon and temperature */}
      <div className="glass flex h-full w-full flex-col items-center justify-center gap-6 rounded-md p-4 sm:flex-row">
        <Image
          height={160}
          width={160}
          alt="Weather icon"
          src={`/weather/${
            !!weatherData.current_weather.is_day ? "day" : "night"
          }/${getWeatherIconPath(weatherData.current_weather.weathercode)}`}
        />
        <div className="flex flex-col items-center justify-center sm:items-start">
          <p className="flex text-6xl font-bold">
            {weatherData.current_weather.temperature}
            <span className="text-base">°C</span>
          </p>
          <h2 className="heading-2 text-center">
            {getWeatherCondition(weatherData.current_weather.weathercode)}
          </h2>
        </div>
      </div>
    </div>
  );
}
