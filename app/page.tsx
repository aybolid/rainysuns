import UseLocation from "@/components/HelloPage/UseLocation";
import LocationSearch from "@/components/HelloPage/LocationSearch";

export default function HelloPage() {
  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <section className="glass flex w-full max-w-3xl flex-col items-center justify-center gap-8 rounded-xl p-6">
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
