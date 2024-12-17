import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Component, OnDestroy } from "@angular/core";
import { NumberService } from "./number.service";
import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "sort-numbers",
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner,
    NgTemplateOutlet,
    NgClass,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: "./sort-numbers.component.html",
  styleUrls: ["./sort-numbers.component.scss"],
})
export class SortNumbersComponent implements OnDestroy {
  numbers: number[] = [0, 0, 0, 0, 0];
  progress$: Observable<number>;
  isSorting: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(private numberService: NumberService) {
    this.progress$ = this.numberService.getCurrentSortingProgress();
    //this.subscriptions.add(this.numberService.getCurrentSortingProgress().subscribe((currentProgress: number) => this.progress = currentProgress));
  }

  fetchRandomNumbers(): void {
    this.numberService.getRandomNumbers().subscribe((numbers: number[]) => {
      this.numbers = numbers;
    });
  }

  async sortNumbers(): Promise<void> {
    this.isSorting = true;
    await this.numberService.sortNumbers(this.numbers);
    this.isSorting = false;
  }

  isLowest(number: number): boolean {
    if (this.allNumbersEqual()) {
      return false;
    }
    return Math.min(...this.numbers) === number;
  }

  isHighest(number: number): boolean {
    if (this.allNumbersEqual()) {
      return false;
    }
    return Math.max(...this.numbers) === number;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private allNumbersEqual(): boolean {
    return Math.max(...this.numbers) === Math.min(...this.numbers);
  }
}
