import { Injectable } from '@angular/core';
import idb, { DB } from 'idb';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private dataChange: Subject<HTMLAudioElement> = new Subject<HTMLAudioElement>();
  private dbPromise: Promise<DB>;

  constructor() {
  }

  connectToIDB() {
    this.dbPromise = idb.open('tasoundboard-database', 1, UpgradeDB => {
      if (!UpgradeDB.objectStoreNames.contains('Items')) {
        UpgradeDB.createObjectStore('Items', { keyPath: 'id', autoIncrement: true });
      }
      if (!UpgradeDB.objectStoreNames.contains('Sync-Items')) {
        UpgradeDB.createObjectStore('Sync-Items', { keyPath: 'id', autoIncrement: true });
      }
    });
  }

  addItems(target: string, value: HTMLAudioElement) {
    this.dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).put({
        audio: value
      });
      this.getAllData('Items').then((items: HTMLAudioElement) => {
        this.dataChange.next(items);
      });
      return tx.complete;
    });
  }

  deleteItems(target: string, value: HTMLAudioElement) {
    this.dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      store.delete(value);
      this.getAllData(target).then((items: HTMLAudioElement) => {
        this.dataChange.next(items);
      });
      return tx.complete;
    });
  }

  getAllData(target: string) {
    return this.dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.getAll();
    });
  }

  dataChanged(): Observable<HTMLAudioElement> {
    return this.dataChange;
  }
}
