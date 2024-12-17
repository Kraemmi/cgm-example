import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Component} from "@angular/core";

@Component({
  selector: 'sort-numbers',
  standalone: true,
  imports: [HttpClientModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './sort-numbers.component.html',
  styleUrls: ['./sort-numbers.component.scss'],
})
export class SortNumbersComponent {

}
