export interface WeatherModel {
  time: Date;
  coordinates: {
    lat: number;
    lon: number;
  };
  temp: number;
  pressure: number;
  humidity: number;
  conditions: string;
  precipitation: {
    type: string;
    value: number;
  };
  wind: {
    direction: number;
    speed: number;
  };
  precipProbability?: number;
  imgUrl?: string;
}
