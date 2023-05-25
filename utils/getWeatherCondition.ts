import { weatherConditionCodes } from "@/data/weather";

const getWeatherCondition = (weatherCode: number): string => {
  return weatherConditionCodes[weatherCode];
};

export default getWeatherCondition;
