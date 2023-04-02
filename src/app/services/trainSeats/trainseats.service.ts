import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class TrainseatsService {
  // url = "http//:localhost:3000";
  private baseUrl = "https://unstop-assignment-p3q7.vercel.app";
  constructor(private http: HttpClient) {}

  getSeats() {
    console.log(this.baseUrl, "url");
    return this.http.get(`${this.baseUrl}/trainSeats/getAllSeats`);
  }
  registerSeats(data) {
    return this.http.post(`${this.baseUrl}/trainSeats/bookSeats`, data);
  }
  resetAll() {
    return this.http.get(`${this.baseUrl}/trainSeats/resetAll`);
  }
}
