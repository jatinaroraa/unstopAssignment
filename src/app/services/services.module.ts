import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TrainseatsService } from "./trainSeats/trainseats.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [TrainseatsService],
})
export class ServicesModule {}
