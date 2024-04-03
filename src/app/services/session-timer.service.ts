import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionTimerService {
  private _count: number = 0;
  private timerSubscription!: Subscription;
  private timer: Observable<number> = interval(1000);
  private _sessionFinished = new Subject<boolean>();
  sessionFinished$ = this._sessionFinished.asObservable();

  startTimer(timeoutSeconds: number) {
    this.stopTimer();
    this._count = timeoutSeconds;
    this.timerSubscription = this.timer.subscribe((n) => {
      if (this._count > 0) {
        this._count--;
        //this._remainSeconds.next(this._count);
        if (this._count === 0) this._sessionFinished.next(true);
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
