import { Injectable } from "@angular/core";
import { HousingLocation } from "../interfaces/housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";

  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const housingLocationList = await fetch(this.url);
    return (await housingLocationList.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const location = await fetch(`${this.url}/${id}`);
    return (await location.json()) ?? {};
  }

  submit(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
