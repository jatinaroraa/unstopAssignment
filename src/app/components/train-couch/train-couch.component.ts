import { Component, OnInit } from "@angular/core";
import { ServicesModule } from "src/app/services/services.module";
import { TrainseatsService } from "src/app/services/trainSeats/trainseats.service";

@Component({
  selector: "app-train-couch",
  templateUrl: "./train-couch.component.html",
  styleUrls: ["./train-couch.component.css"],
})
export class TrainCouchComponent implements OnInit {
  rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k"];
  seats = [
    { number: 1, status: "available" },
    { number: 2, status: "available" },
    { number: 3, status: "available" },
    { number: 4, status: "available" },
    { number: 5, status: "available" },
    { number: 6, status: "available" },
    { number: 7, status: "available" },
  ];
  name: string;
  mobile: number;
  totalSeats: number;
  getSeats;
  bookedSeats;
  onSeatClick(seat: any) {
    if (seat.status === "available") {
      seat.status = "booked";
    } else if (seat.status === "reserved") {
      seat.status = "available";
    }
  }
  constructor(private TrainSeats: TrainseatsService) {
    // let seats = new TrainseatsService();
  }
  registerSeats() {
    if (!this.name || !this.mobile || !this.totalSeats)
      return window.alert("Enter all details");
    if (this.totalSeats > 7) {
      return window.alert("you cant book more than 7 seats");
    }
    let body = {
      user: {
        name: this.name,
        mobileNumber: this.mobile,
        totalSeats: this.totalSeats,
      },
    };
    this.TrainSeats.registerSeats(body).subscribe((sucess) => {
      console.log(sucess, "register");
      this.bookedSeats = sucess;

      if (!sucess || this.bookedSeats.length == 0)
        return window.alert("No seats left");
      this.getAllSeatsData();
      // this.getSeats = sucess;
    });
    // console.log("hit funct", this.name, this.mobile, this.totalSeats);
  }
  resetAll() {
    //reset all

    this.TrainSeats.resetAll().subscribe((data) => {
      if (!data) {
        return window.alert("error in reset");
      }
      this.getAllSeatsData();
    });
  }
  getAllSeatsData() {
    this.TrainSeats.getSeats().subscribe((data) => {
      console.log(data, "seats");
      this.getSeats = data;
    });
  }
  ngOnInit(): void {
    // this.TrainSeats.getSeats().subscribe((data) => {
    //   console.log(data, "seats");
    //   this.getSeats = data;
    // });
    this.getAllSeatsData();
  }
}
