import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasoundboard';
  showNsfw = false;

  constructor(private messageService: MessageService) {}

  stopMusic() {
    this.messageService.stopMusic();
  }

  toggleNsfw() {
    this.messageService.toggleNsfw(!this.showNsfw);
  }


}
