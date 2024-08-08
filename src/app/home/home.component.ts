import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../interfaces/housing-location";
import { HousingService } from "../services/housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `<section>
      <form action="">
        <input type="text" name="" id="" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResult(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredHousingLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>`,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];
  housingService = inject(HousingService);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredHousingLocationList = housingLocationList;
      });
  }

  filterResult(value: string) {
    if (!value) this.filteredHousingLocationList = this.housingLocationList;

    this.filteredHousingLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(value.toLowerCase())
    );
  }
}
