"use client";

import React, { MutableRefObject } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { Weather } from "@/interfaces/weather";
import getCurrentIndex from "@/utils/getCurrentIndex";
import { format, parseISO } from "date-fns";
import Image from "next/image";

interface DayForecastProps {
  weatherData: Weather;
}

export default function DayForecast({ weatherData }: DayForecastProps) {
  const { hourly } = weatherData;
  const idx = getCurrentIndex(weatherData);

  const timeFromNow = hourly.time.slice(idx, idx + 24);
  const tempFromNow = hourly.temperature_2m.slice(idx, idx + 24);
  const precipFromNow = hourly.precipitation_probability.slice(idx, idx + 24);

  const dataToDisplay = timeFromNow.map((time, i) => {
    return {
      time:
        format(parseISO(time), "HH:mm") === "00:00"
          ? format(parseISO(time), "dd.MM")
          : format(parseISO(time), "HH:mm"),
      temp: tempFromNow[i],
      precip: precipFromNow[i],
    };
  });

  const RenderedForecast = (): JSX.Element => {
    const ref =
      React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
      applyRubberBandEffect: true,
      decayRate: 0,
      safeDisplacement: 21,
    });

    return (
      <div
        ref={ref}
        {...events}
        className="custom-scroll glass grid max-w-xs select-none grid-cols-[repeat(24,minmax(90px,90px))] items-center justify-start gap-2 overflow-x-scroll rounded-md p-4 sm:max-w-md md:max-w-xl lg:max-w-5xl"
      >
        {dataToDisplay.map(({ time, temp, precip }, idx) => (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={time}
          >
            <p
              className={
                idx === 0 || !time.includes(":") ? "text-pink-400" : ""
              }
            >
              {idx === 0 ? "Now" : time}
            </p>
            <div className="glass flex w-[90px] flex-col items-center justify-center rounded-md p-2">
              <p className="flex items-start justify-center">
                {temp}
                <span className="text-[8px]">°C</span>
              </p>
              <div className="flex items-center justify-center gap-1">
                <Image
                  className="pointer-events-none"
                  src={"/weather/humidity.svg"}
                  alt="Rain"
                  width={15}
                  height={15}
                />
                <small>{precip}%</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h2 className="heading-2">24 Hours Forecast</h2>
      <RenderedForecast />
      {/* <pre>{JSON.stringify(timeFromNow, null, 2)}</pre> */}
    </div>
  );
}
