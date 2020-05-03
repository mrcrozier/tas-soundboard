import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoardItem } from 'src/app/models/board-item';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit, OnDestroy {

  @Input() item: BoardItem;
  audio: HTMLAudioElement;
  stopMusicSub: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.stopMusicSub = this.messageService.getStopMusicSub().subscribe(toBeStopped => {
      if (toBeStopped) {
        this.stopAudio();
      }
    });
  }

  playAudio() {
    if (!this.audio) { this.audio = new Audio(this.item.sound); }
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.play();
    }

  }

  buttonColor(): string {
    const firstLetter = this.item.name[0].toLowerCase();
    if (firstLetter <= 'g') {
      return 'primary';
    } else if (firstLetter <= 'm') {
      return 'success';
    } else if (firstLetter <= 'q') {
      return 'info';
    } else if (firstLetter > 'q') {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  ngOnDestroy() {
    this.stopAudio();
    this.stopMusicSub.unsubscribe();
  }

}
