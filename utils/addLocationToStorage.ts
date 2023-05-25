import { Location } from "@/interfaces/location";

export interface StorageLocation {
  flag: string;
  label: string;
  id: number;
  long: number;
  lat: number;
}

const addLocationToStorage = (newLocation: StorageLocation) => {
  if (!localStorage.getItem("locations")) {
    return localStorage.setItem("locations", JSON.stringify([newLocation]));
  }

  const locations = JSON.parse(localStorage.getItem("locations") as string);

  const alredyInStorage = locations.some(
    (loc: Location) => loc.id === newLocation.id
  );
  if (alredyInStorage) return;
  if (locations.length >= 3) locations.pop();

  locations.unshift(newLocation);
  localStorage.setItem("locations", JSON.stringify(locations));
};

export default addLocationToStorage;
