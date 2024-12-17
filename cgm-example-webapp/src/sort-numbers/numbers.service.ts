import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NumbersService {
  private readonly apiBaseUrl = "http://127.0.0.1:8000/";
  private readonly randomNumbersUrl: string = this.apiBaseUrl + "random-numbers/5";
  private sortDelayMilliSeconds: number = 5000;
  private sortingProgress: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getRandomNumbers(): Observable<number[]> {
    return this.http.get<number[]>(this.randomNumbersUrl);
  }

  getCurrentSortingProgress(): Observable<number> {
    return this.sortingProgress.asObservable();
  }

  async sortNumbers(numbers: number[]): Promise<void> {
    const id = this.startSortingProgress();
    await this.delay(this.sortDelayMilliSeconds);
    numbers.sort((a, b) => a - b);
    this.stopSortingProgress(id);
  }

  private startSortingProgress(): number {
    return window.setInterval(
      () => this.increaseProgress(),
      this.sortDelayMilliSeconds / 100,
    );
  }

  private stopSortingProgress(id: number): void {
    window.clearInterval(id);
    this.resetProgress();
  }

  private async delay(delayInMilliSeconds: number): Promise<void> {
    return new Promise((resolve) =>
      window.setTimeout(resolve, delayInMilliSeconds),
    );
  }

  private increaseProgress(amountOfIncrease: number = 1): void {
    if (this.sortingProgress.value + amountOfIncrease <= 100) {
      this.sortingProgress.next(this.sortingProgress.value + amountOfIncrease);
      return;
    }
    this.sortingProgress.next(100);
  }

  private resetProgress(): void {
    this.sortingProgress.next(0);
  }
}
