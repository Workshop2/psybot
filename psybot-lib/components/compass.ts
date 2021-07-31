export interface CompassPoint {
    Name: string;
    Abbr: string;
    Low: number;
    High: number;
    Heading: Heading;
};

export enum Heading {
    North = "North",
    NorthEast = "NorthEast",
    East = "East",
    SouthEast = "SouthEast",
    South = "South",
    SouthWest = "SouthWest",
    West = "West",
    NorthWest = "NorthWest"
};

export class Compass {    
 public static Points : Array<CompassPoint> = [{
    Name: "North",
    Abbr: "N",
    Low: 354.38,
    High: 360,
    Heading: Heading.North
  }, {
    Name: "North",
    Abbr: "N",
    Low: 0,
    High: 5.62,
    Heading: Heading.North
  }, {
    Name: "North by East",
    Abbr: "NbE",
    Low: 5.63,
    High: 16.87,
    Heading: Heading.NorthEast
  }, {
    Name: "North-NorthEast",
    Abbr: "NNE",
    Low: 16.88,
    High: 28.12,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast by North",
    Abbr: "NEbN",
    Low: 28.13,
    High: 39.37,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast",
    Abbr: "NE",
    Low: 39.38,
    High: 50.62,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast by East",
    Abbr: "NEbE",
    Low: 50.63,
    High: 61.87,
    Heading: Heading.NorthEast
  }, {
    Name: "East-NorthEast",
    Abbr: "ENE",
    Low: 61.88,
    High: 73.12,
    Heading: Heading.NorthEast
  }, {
    Name: "East by North",
    Abbr: "EbN",
    Low: 73.13,
    High: 84.37,
    Heading: Heading.NorthEast
  }, {
    Name: "East",
    Abbr: "E",
    Low: 84.38,
    High: 95.62,
    Heading: Heading.East
  }, {
    Name: "East by South",
    Abbr: "EbS",
    Low: 95.63,
    High: 106.87,
    Heading: Heading.SouthEast
  }, {
    Name: "East-SouthEast",
    Abbr: "ESE",
    Low: 106.88,
    High: 118.12,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast by East",
    Abbr: "SEbE",
    Low: 118.13,
    High: 129.37,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast",
    Abbr: "SE",
    Low: 129.38,
    High: 140.62,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast by South",
    Abbr: "SEbS",
    Low: 140.63,
    High: 151.87,
    Heading: Heading.SouthEast
  }, {
    Name: "South-SouthEast",
    Abbr: "SSE",
    Low: 151.88,
    High: 163.12,
    Heading: Heading.SouthEast
  }, {
    Name: "South by East",
    Abbr: "SbE",
    Low: 163.13,
    High: 174.37,
    Heading: Heading.SouthEast
  }, {
    Name: "South",
    Abbr: "S",
    Low: 174.38,
    High: 185.62,
    Heading: Heading.South
  }, {
    Name: "South by West",
    Abbr: "SbW",
    Low: 185.63,
    High: 196.87,
    Heading: Heading.SouthWest
  }, {
    Name: "South-SouthWest",
    Abbr: "SSW",
    Low: 196.88,
    High: 208.12,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest by South",
    Abbr: "SWbS",
    Low: 208.13,
    High: 219.37,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest",
    Abbr: "SW",
    Low: 219.38,
    High: 230.62,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest by West",
    Abbr: "SWbW",
    Low: 230.63,
    High: 241.87,
    Heading: Heading.SouthWest
  }, {
    Name: "West-SouthWest",
    Abbr: "WSW",
    Low: 241.88,
    High: 253.12,
    Heading: Heading.SouthWest
  }, {
    Name: "West by South",
    Abbr: "WbS",
    Low: 253.13,
    High: 264.37,
    Heading: Heading.SouthWest
  }, {
    Name: "West",
    Abbr: "W",
    Low: 264.38,
    High: 275.62,
    Heading: Heading.West
  }, {
    Name: "West by North",
    Abbr: "WbN",
    Low: 275.63,
    High: 286.87,
    Heading: Heading.NorthWest
  }, {
    Name: "West-NorthWest",
    Abbr: "WNW",
    Low: 286.88,
    High: 298.12,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest by West",
    Abbr: "NWbW",
    Low: 298.13,
    High: 309.37,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest",
    Abbr: "NW",
    Low: 309.38,
    High: 320.62,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest by North",
    Abbr: "NWbN",
    Low: 320.63,
    High: 331.87,
    Heading: Heading.NorthWest
  }, {
    Name: "North-NorthWest",
    Abbr: "NNW",
    Low: 331.88,
    High: 343.12,
    Heading: Heading.NorthWest
  }, {
    Name: "North by West",
    Abbr: "NbW",
    Low: 343.13,
    High: 354.37,
    Heading: Heading.NorthWest
  }];
};