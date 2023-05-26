'use client';

import React from 'react';

import Button from '../elements/Button';
import useSettingsStore from '@/lib/stores/useSettingsStore';

export default function Controls() {
  const [useMetric, toggleUnits] = useSettingsStore((state) => [
    state.useMetric,
    state.toggleUnits,
  ]);

  const [units, setUnits] = React.useState<'Metric' | 'Imperial'>();
  React.useEffect(() => {
    if (useMetric) {
      setUnits('Metric');
    } else {
      setUnits('Imperial');
    }
  }, [useMetric]);

  return (
    <div>
      <Button
        onClick={() => toggleUnits()}
        label={units ? (units as string) : 'Loading...'}
        size="lg"
        type="secondary"
      />
    </div>
  );
}
