'use client';

import React from 'react';

import Button from '../elements/Button';

export default function Controls() {
  const [units, setUnits] = React.useState<'metric' | 'imperial'>();

  React.useEffect(() => {
    const u = localStorage.getItem('units');
    console.log('u: ', u);
    if (u) {
      setUnits(u as 'metric' | 'imperial');
    } else {
      localStorage.setItem('units', 'metric');
      setUnits('metric');
    }
  }, [units]);

  return (
    <div>
      <Button
        onClick={() => {
          localStorage.setItem(
            'units',
            units === 'metric' ? 'imperial' : 'metric'
          );
          setUnits(units === 'metric' ? 'imperial' : 'metric');
        }}
        label={
          !units ? 'Loading...' : units === 'metric' ? 'Metric' : 'Imperial'
        }
        size="lg"
        type="secondary"
      />
    </div>
  );
}
