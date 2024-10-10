export interface IPosition {
  latitude?: number | null;
  longitude?: number | null;
  error?: string | null;
}

export interface ICoordinate {
  lat?: Pick<number | null>;
  lng?: Pick<number | null>;
}

export interface IHeatmap {
  positions: {
    lat: number;
    lng: number;
    weight?: number;
  }[];
  options: {
    radius?: number;
    opacity?: number;
  };
}

export interface ICountryInfo {
  shortName?: string;
  longName?: string;
  currency?: ICurrency;
  timeZone?: string;
  numberFormat?: INumberFormat;
  dateFormat?: string;
  code?: string;
}
export interface ICurrency {
  code?: string;
  name?: string;
}
export interface INumberFormat {
  decimalSeparator?: string;
  thousandsSeparator?: string;
}
