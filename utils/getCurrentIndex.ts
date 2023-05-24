import { Weather } from '@/interfaces/weather';

const getCurrentIndex = (weatherData: Weather) => {
  const currentIndex = weatherData.hourly.time.findIndex(
    (time) => time === weatherData.current_weather.time
  );

  return currentIndex;
};

export default getCurrentIndex;
