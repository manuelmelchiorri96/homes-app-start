import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingLocation } from "../interfaces/housing-location";
import { HousingService } from "../services/housing.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
    <img class="listing-photo" [src]="housingLocation?.photo" alt="" />
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">
        {{ housingLocation?.city }}, {{ housingLocation?.state }}
      </p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{ housingLocation?.availableUnits }}</li>
        <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
        <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" action="" (submit)="submit()">
        <label for="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          formControlName="firstName"
        />
        <label for="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          formControlName="lastName"
        />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" formControlName="email" />
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>`,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  housingLocation: HousingLocation | undefined;
  housingService = inject(HousingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((location) => {
        this.housingLocation = location;
      });
  }

  submit() {
    this.housingService.submit(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
