import { Location } from '@/interfaces/location';

export const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

const getLoactionLinkLabel = (location: Location) => {
  const flag = getFlagEmoji(location.country_code);
  const label = `${location.name}, ${
    location.admin1 || location.admin2 || location.admin3 || location.admin4
  }`;
  
  return { flag, label };
};

export default getLoactionLinkLabel;
