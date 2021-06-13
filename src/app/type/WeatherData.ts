export interface WeatherData {
  dt: Date;
  dt_txt: string;
  main: Temperature;
  weatherType: WeatherType[];
  clouds: { all: number };
  sys: { pod: string };
}

interface Temperature {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

interface WeatherType {
  id: number;
  main: string;
  description: string;
  icon: string;
}
