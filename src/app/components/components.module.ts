import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrainCouchComponent } from "./train-couch/train-couch.component";
import { FormsModule } from "@angular/forms";
// import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
@NgModule({
  declarations: [TrainCouchComponent],
  imports: [CommonModule, FormsModule],
  exports: [TrainCouchComponent],
})
export class ComponentsModule {}
