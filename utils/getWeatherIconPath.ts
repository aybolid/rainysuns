import { weatherConditionIcons } from '@/data/weather';

const getWeatherIconPath = (weatherCode: number): string => {
  return weatherConditionIcons[weatherCode];
};

export default getWeatherIconPath;
