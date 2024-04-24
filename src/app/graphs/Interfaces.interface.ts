export interface Flight {
  id: string;
  flight_number: string;
  timestamp: string;
  destination: string;
  altitude: number;
  airspeed: number;
  temperature: number;
  pressure: number;
  passengers: number;
  capacity: number;
  company_name: string;
  plane_name: string;
  plane_model: string;
  plane_age: number;
  current_occupied_spaces: number;
  speed: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  endX: number;
  endY: number;
  starting_airport_name: string;
  starting_airport_X: number;
  starting_airport_Y: number;
  end_airport_name: string;
  end_airport_X: number;
  end_airport_Y: number;
  departure_time: string;
  estimated_arrival_time: string;
  arrival_time: string;
}


export interface  Airports{
  airport_name: string;
  country: string;
  city: string;
  airportX: number;
  airportY: number;
  airport_age: number;
  flights_inbound: number;
  flights_outbound: number;
  delays_at_arrival: number;
  delays_at_departure: number;
  busyness: string;
  airplane_capacity: number;
}
