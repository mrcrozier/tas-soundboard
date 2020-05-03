import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoardItem } from '../models/board-item';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardItems: BoardItem[];
  allBoardItems: BoardItem[];
  toggleNsfwSub: Subscription;

  constructor(db: AngularFirestore, private messageService: MessageService) {
    db.firestore.enablePersistence()
      .catch(err => {
        if (err.code == 'failed-precondition') {
          console.log('Failed Precondition');
        } else if (err.code == 'unimplemented') {
          console.log('unimplemented');
        }
      });

    db.collection<BoardItem>('board-items').valueChanges().subscribe(items => {
      this.boardItems = items.filter(x => x.name);
      this.boardItems.sort((a, b) => a.name[0].toLowerCase().charCodeAt(0) - b.name[0].toLowerCase().charCodeAt(0));
      this.allBoardItems = this.boardItems;
      this.boardItems = this.allBoardItems.filter(x => x.nsfw === false);
    });
  }

  ngOnInit() {
    this.toggleNsfwSub = this.messageService.getToggleNsfwSub().subscribe(showNsfw => {
      if (this.allBoardItems) {
        this.boardItems = showNsfw ? this.allBoardItems : this.allBoardItems.filter(x => x.nsfw === false);
      }
    });
  }
}
