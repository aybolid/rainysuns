'use client';

import React from 'react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

import useForm from '@/hooks/useForm';
import LabeledInput from '../elements/LabeledInput';
import { Location } from '@/interfaces/location';
import getLoactionLinkLabel from '@/utils/getLocationLinkLabel';

const API_URL = process.env.NEXT_PUBLIC_GEOCODING_API_URL;

const getLocation = async (locationName: string) => {
  const data: Location[] = await fetch(
    `${API_URL}search?name=${locationName}&count=7&language=en&format=json`
  )
    .then((res) => res.json())
    .then((data) =>
      data.results
        ? data.results.filter((city: Location) => city.country_code !== 'RU')
        : []
    );

  return data;
};

export default function LocationSearch() {
  const { data, onChange } = useForm({ city: '' });

  const [locations, setLocations] = React.useState<Location[] | null>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLocationSearch = () => {
    getLocation(data.city)
      .then((data) => {
        if (data.length === 0) {
          setLocations(null);
        } else {
          setLocations(data);
        }
      })
      .then(() => setIsLoading(false));
  };

  const debouncedLocationSearch = useDebouncedCallback(
    handleLocationSearch,
    200
  );
  React.useEffect(() => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(data.city)) return;

    if (data.city.length > 1) {
      setIsLoading(true);
      debouncedLocationSearch();
    } else {
      setIsLoading(false);
      setLocations([]);
    }
  }, [data.city, debouncedLocationSearch]);

  const RenderedLocations = () => {
    return (
      <div
        className={`mt-6 p-4 rounded-md bg-gradient-to-tr from-indigo-950 via-indigo-900 to-indigo-800 flex flex-col justify-start items-start gap-3 duration-150 ease-in-out`}
      >
        {locations === null ? (
          <p>No cities found</p>
        ) : (
          locations.map((location) => (
            <LoactionLink key={location.id} location={location} />
          ))
        )}
      </div>
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      <LabeledInput
        value={data.city}
        onChange={onChange}
        label="Search for city (en)"
        placeholder="New York"
        type="text"
        name="city"
      />
      {isLoading && <p className="w-full mt-6 text-center">Searching...</p>}
      {locations === null || locations!.length > 0 ? (
        <RenderedLocations />
      ) : null}
    </form>
  );
}

const LoactionLink = ({ location }: { location: Location }) => {
  const { flag, label } = getLoactionLinkLabel(location);

  return (
    <Link
      className="flex justify-center items-center gap-2 glass hover:bg-opacity-20 px-3 rounded-md"
      href={`/weather?long=${location.longitude}&lat=${location.latitude}`}
    >
      <span className="text-2xl">{flag}</span>
      <span className="text-lg">{label}</span>
    </Link>
  );
};
