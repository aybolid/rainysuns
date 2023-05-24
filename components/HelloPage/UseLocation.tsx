'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Button from '../elements/Button';


export default function UseLocation() {
  const [loading, setLoading] = React.useState(false);
  const r = useRouter();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const [lat, long] = [latitude.toFixed(4), longitude.toFixed(4)];
        setLoading(false);
        r.push(`/weather?long=${long}&lat=${lat}`);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Button
        onClick={handleGetLocation}
        label={loading ? 'Loading...' : 'Use My Location'}
        size="lg"
        type="primary"
      />
    </div>
  );
}