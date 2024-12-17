import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  private apiBaseUrl = 'http://127.0.0.1:8000/';
  private randomNumbersUrl: string = this.apiBaseUrl + 'random-numbers';
  private sortDelayMilliSeconds: number = 5000;
  private sortingProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getRandomNumbers(): Observable<number[]> {
    return this.http.get<number[]>(this.randomNumbersUrl);
  }

  getCurrentSortingProgress(): Observable<number> {
    return this.sortingProgress.asObservable();
  }

  async sortNumbers(numbers: number[]): Promise<void> {
    let id = setInterval(() => this.increaseProgress(), this.sortDelayMilliSeconds / 100);
    await new Promise(resolve => setTimeout(resolve, this.sortDelayMilliSeconds));
    numbers.sort((a, b) => a - b);
    clearInterval(id);
    this.resetProgress();
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
