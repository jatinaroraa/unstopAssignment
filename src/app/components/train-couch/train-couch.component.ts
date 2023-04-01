import { Component, OnInit } from "@angular/core";

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
  onSeatClick(seat: any) {
    if (seat.status === "available") {
      seat.status = "booked";
    } else if (seat.status === "reserved") {
      seat.status = "available";
    }
  }
  registerSeats() {
    if (this.totalSeats > 7) {
      return window.alert("you cant book more than 7 seats");
    }
    console.log("hit funct", this.name, this.mobile, this.totalSeats);
  }
  constructor() {}

  ngOnInit(): void {}
}
