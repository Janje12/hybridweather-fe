export interface City {
  id: number;
  name: string;
  country: string;
  coord: { lat: number, lon: number };
  sunset: Date;
  sunrise: Date;
  timezone: number;
}
