import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrainCouchComponent } from "./train-couch/train-couch.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServicesModule } from "../services/services.module";
// import { MatInputModule } from "@angular/material/input";
// import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
@NgModule({
  declarations: [TrainCouchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ServicesModule],
  exports: [TrainCouchComponent],
})
export class ComponentsModule {}
