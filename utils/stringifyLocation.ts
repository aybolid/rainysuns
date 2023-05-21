import { ReverseGeocodingLocation } from '@/interfaces/location';
import { getFlagEmoji } from './getLocationLinkLabel';

const stringifyLocation = (location: ReverseGeocodingLocation) => {
  const flag = getFlagEmoji(location.country_code);
  return `${flag} ${location.city}, ${location.country}`;
};

export default stringifyLocation;
