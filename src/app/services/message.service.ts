import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private stopMusicSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private toggleNsfwSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  stopMusic() {
    this.stopMusicSub.next(true);
  }

  clearMusicSub() {
    this.stopMusicSub.next(false);
  }

  getStopMusicSub(): Observable<any> {
    return this.stopMusicSub.asObservable();
  }

  toggleNsfw(showNsfw: boolean) {
    this.toggleNsfwSub.next(showNsfw);
  }

  getToggleNsfwSub(): Observable<any> {
    return this.toggleNsfwSub.asObservable();
  }

}
