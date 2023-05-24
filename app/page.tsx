import UseLocation from '@/components/HelloPage/UseLocation';
import LocationSearch from '@/components/HelloPage/LocationSearch';

export default function HelloPage() {
  return (
    <div className="container h-full flex justify-center items-center flex-col">
      <section className="p-6 glass rounded-xl w-full max-w-3xl flex flex-col justify-center items-center gap-8">
        <h1 className="heading-1 w-full">Good to see you!</h1>
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
