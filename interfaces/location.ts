export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}

export interface ReverseGeocodingLocation {
  datasource: {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  };
  country: string;
  country_code: string;
  state: string;
  city: string;
  municipality: string;
  postcode: string;
  district: string;
  borough: string;
  neighbourhood: string;
  suburb: string;
  street: string;
  housenumber: string;
  lon: number;
  lat: number;
  distance: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
  rank: {
    importance: number;
    popularity: number;
  };
  place_id: string;
}
