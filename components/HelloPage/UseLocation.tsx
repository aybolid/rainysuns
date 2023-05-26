'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Button from '../elements/Button';
import useSettingsStore from '@/lib/stores/useSettingsStore';

export default function UseLocation() {
  const [useMetric] = useSettingsStore((state) => [state.useMetric]);

  const [loading, setLoading] = React.useState(false);
  const r = useRouter();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const [lat, long] = [latitude.toFixed(4), longitude.toFixed(4)];
        setLoading(false);
        r.push(
          `/weather?long=${long}&lat=${lat}&units=${
            useMetric ? 'metric' : 'imperial'
          }`
        );
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        onClick={handleGetLocation}
        label={loading ? 'Loading...' : 'Use My Location'}
        size="lg"
        type="primary"
      />
    </div>
  );
}
