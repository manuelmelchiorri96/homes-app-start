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
    const housingLocation = await fetch(`${this.url}/${id}`);
    return (await housingLocation.json()) ?? {};
  }

  submit(firstName: string, lastName: string, email: string, isValid: boolean) {
    isValid
      ? console.log({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
      : console.log("Form non valido");
  }
}
