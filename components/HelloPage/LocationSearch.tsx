'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

import useForm from '@/hooks/useForm';
import LabeledInput from '../elements/LabeledInput';
import { HistoryLocation, Location } from '@/interfaces/location';
import getLoactionLinkLabel from '@/utils/location/getLocationLinkLabel';
import useOutsideClick from '@/hooks/useOutsideClick';
import useSettingsStore from '@/lib/stores/useSettingsStore';
import useHistoryStore from '@/lib/stores/useHistoryStore';
import Button from '../elements/Button';

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

  const [useMetric] = useSettingsStore((state) => [state.useMetric]);
  const [historyLocations, clearHistory] = useHistoryStore((state) => [
    state.locations,
    state.clearLocations,
  ]);

  const [locations, setLocations] = React.useState<Location[] | undefined>(
    undefined
  );
  const [history, setHistory] = React.useState<HistoryLocation[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(false);

  const searchRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(searchRef, () => setShowResults(false));

  const handleLocationSearch = () => {
    getLocation(data.city)
      .then((data) => {
        setLocations(data);
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
      setLocations(undefined);
    }
  }, [data.city, debouncedLocationSearch]);

  React.useEffect(() => {
    setHistory(historyLocations);
  }, [historyLocations]);

  const RenderedLocations = (): JSX.Element => {
    return (
      <div
        className={`absolute left-0 top-16 z-50 mt-2 flex w-full flex-col items-start justify-start rounded-md bg-sky-50 p-1 text-neutral-800 duration-150 ease-in-out`}
      >
        {isLoading && <p>Searching...</p>}
        {!isLoading && !locations?.length ? (
          <p>No cities found</p>
        ) : (
          locations!.map((location) => (
            <LoactionLink key={location.id} location={location} />
          ))
        )}
      </div>
    );
  };
  const RenderedHistory = (): JSX.Element => {
    return (
      <section className='w-full'>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          {history?.map((location) => (
            <Link
              key={location.id}
              className="glass flex w-full items-center justify-start gap-2 rounded-md px-3 hover:bg-opacity-20"
              href={`/weather?long=${location.long}&lat=${location.lat}&units=${
                useMetric ? 'metric' : 'imperial'
              }`}
            >
              <span className="text-2xl">{location.flag}</span>
              <span className="text-lg">{location.label.split(', ')[0]}</span>
            </Link>
          ))}
        </div>
        <div className="flex w-full items-center justify-end mt-2">
          <Button
            type="danger"
            size="sm"
            label="Clear history"
            onClick={clearHistory}
          />
        </div>
      </section>
    );
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
        <LabeledInput
          value={data.city}
          onClick={() => setShowResults(true)}
          onChange={onChange}
          label="Search for city (EN)"
          placeholder="New York"
          type="search"
          name="city"
        />
        {locations && showResults && (
          <div ref={searchRef}>
            <RenderedLocations />
          </div>
        )}
      </form>
      {history && history.length > 0 && <RenderedHistory />}
    </>
  );
}

const LoactionLink = ({ location }: { location: Location }) => {
  const [addLocation] = useHistoryStore((state) => [state.addLocation]);
  const [useMetric] = useSettingsStore((state) => [state.useMetric]);

  const [clicked, setClicked] = React.useState(false);
  const { flag, label } = getLoactionLinkLabel(location);

  // ! implemented this way to avoid build error on production
  React.useEffect(() => {
    if (!clicked) return;
    const newLocation: HistoryLocation = {
      flag,
      label,
      id: location.id,
      long: location.longitude,
      lat: location.latitude,
    };
    addLocation(newLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  return (
    <Link
      onClick={() => setClicked(true)}
      className="flex w-full items-center justify-start gap-2 rounded-md px-3 hover:bg-blue-500/30"
      href={`/weather?long=${location.longitude}&lat=${
        location.latitude
      }&units=${useMetric ? 'metric' : 'imperial'}`}
    >
      <span className="text-2xl">{flag}</span>
      <span className="text-lg">{label}</span>
    </Link>
  );
};
