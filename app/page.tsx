import Image from 'next/image';

import UseLocation from '@/components/HelloPage/UseLocation';
import LocationSearch from '@/components/HelloPage/LocationSearch';
import Controls from '@/components/WeatherPage/Controls';

export default function HelloPage() {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-8">
      <section className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Image
          src={'/weather/day/mainly-clear.svg'}
          width={100}
          height={100}
          alt="Logo"
        />
        <h1 className="text-5xl md:text-7xl">RainySuns</h1>
      </section>
      <section className="glass flex w-full max-w-3xl flex-col items-center justify-center gap-8 rounded-xl p-6">
        <h2 className="heading-2 w-full">Good to see you!</h2>
        <p className="text-center">
          Choose which metric system you want to use.
        </p>
        <Controls />
        <p className="text-center">
          Select your location to get started. Click on the button below to use
          your current location or search for it.
        </p>
        <UseLocation />
        <LocationSearch />
      </section>
    </div>
  );
}
