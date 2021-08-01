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
    Low: 354.3,
    High: 360,
    Heading: Heading.North
  }, {
    Name: "North",
    Abbr: "N",
    Low: 0,
    High: 5.6,
    Heading: Heading.North
  }, {
    Name: "North by East",
    Abbr: "NbE",
    Low: 5.6,
    High: 16.8,
    Heading: Heading.NorthEast
  }, {
    Name: "North-NorthEast",
    Abbr: "NNE",
    Low: 16.8,
    High: 28.1,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast by North",
    Abbr: "NEbN",
    Low: 28.1,
    High: 39.3,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast",
    Abbr: "NE",
    Low: 39.3,
    High: 50.6,
    Heading: Heading.NorthEast
  }, {
    Name: "NorthEast by East",
    Abbr: "NEbE",
    Low: 50.6,
    High: 61.8,
    Heading: Heading.NorthEast
  }, {
    Name: "East-NorthEast",
    Abbr: "ENE",
    Low: 61.8,
    High: 73.1,
    Heading: Heading.NorthEast
  }, {
    Name: "East by North",
    Abbr: "EbN",
    Low: 73.1,
    High: 84.3,
    Heading: Heading.NorthEast
  }, {
    Name: "East",
    Abbr: "E",
    Low: 84.3,
    High: 95.6,
    Heading: Heading.East
  }, {
    Name: "East by South",
    Abbr: "EbS",
    Low: 95.6,
    High: 106.8,
    Heading: Heading.SouthEast
  }, {
    Name: "East-SouthEast",
    Abbr: "ESE",
    Low: 106.8,
    High: 118.1,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast by East",
    Abbr: "SEbE",
    Low: 118.1,
    High: 129.3,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast",
    Abbr: "SE",
    Low: 129.3,
    High: 140.6,
    Heading: Heading.SouthEast
  }, {
    Name: "SouthEast by South",
    Abbr: "SEbS",
    Low: 140.6,
    High: 151.8,
    Heading: Heading.SouthEast
  }, {
    Name: "South-SouthEast",
    Abbr: "SSE",
    Low: 151.8,
    High: 163.1,
    Heading: Heading.SouthEast
  }, {
    Name: "South by East",
    Abbr: "SbE",
    Low: 163.1,
    High: 174.3,
    Heading: Heading.SouthEast
  }, {
    Name: "South",
    Abbr: "S",
    Low: 174.3,
    High: 185.6,
    Heading: Heading.South
  }, {
    Name: "South by West",
    Abbr: "SbW",
    Low: 185.6,
    High: 196.8,
    Heading: Heading.SouthWest
  }, {
    Name: "South-SouthWest",
    Abbr: "SSW",
    Low: 196.8,
    High: 208.1,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest by South",
    Abbr: "SWbS",
    Low: 208.1,
    High: 219.3,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest",
    Abbr: "SW",
    Low: 219.3,
    High: 230.6,
    Heading: Heading.SouthWest
  }, {
    Name: "SouthWest by West",
    Abbr: "SWbW",
    Low: 230.6,
    High: 241.8,
    Heading: Heading.SouthWest
  }, {
    Name: "West-SouthWest",
    Abbr: "WSW",
    Low: 241.8,
    High: 253.1,
    Heading: Heading.SouthWest
  }, {
    Name: "West by South",
    Abbr: "WbS",
    Low: 253.1,
    High: 264.3,
    Heading: Heading.SouthWest
  }, {
    Name: "West",
    Abbr: "W",
    Low: 264.3,
    High: 275.6,
    Heading: Heading.West
  }, {
    Name: "West by North",
    Abbr: "WbN",
    Low: 275.6,
    High: 286.8,
    Heading: Heading.NorthWest
  }, {
    Name: "West-NorthWest",
    Abbr: "WNW",
    Low: 286.8,
    High: 298.1,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest by West",
    Abbr: "NWbW",
    Low: 298.1,
    High: 309.3,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest",
    Abbr: "NW",
    Low: 309.3,
    High: 320.6,
    Heading: Heading.NorthWest
  }, {
    Name: "NorthWest by North",
    Abbr: "NWbN",
    Low: 320.6,
    High: 331.8,
    Heading: Heading.NorthWest
  }, {
    Name: "North-NorthWest",
    Abbr: "NNW",
    Low: 331.8,
    High: 343.1,
    Heading: Heading.NorthWest
  }, {
    Name: "North by West",
    Abbr: "NbW",
    Low: 343.1,
    High: 354.3,
    Heading: Heading.NorthWest
  }];
};