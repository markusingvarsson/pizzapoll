import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface PollItem {
  id: string;
  name: string;
  numberOfVotes: number;
}

@Injectable({
  providedIn: 'root',
})
export class PollService {
  hasVoted = signal(false);
  // pollItems: WritableSignal<PollItem[]> = signal([
  //   { id: 'pineapple', name: 'Pineapple', numberOfVotes: 0 },
  //   { id: 'pepperoni', name: 'Pepperoni', numberOfVotes: 0 },
  // ]);
  firestore = inject(Firestore);
  pollItemsCollection = collection(this.firestore, 'votes');
  pollItems$: Observable<PollItem[]> = collectionData(
    this.pollItemsCollection,
    { idField: 'id' }
  );
  pollItems = toSignal(this.pollItems$, { initialValue: [] });

  async vote(id: string) {
    this.hasVoted.set(true);
    const pollItemsToUpdate = [...this.pollItems()];
    const updatedPollItem = pollItemsToUpdate.find(
      (pollItem) => pollItem.id === id
    );
    if (updatedPollItem === undefined) return;
    updatedPollItem.numberOfVotes++;
    const docRef = doc(this.firestore, 'votes/' + id);
    await setDoc(docRef, updatedPollItem);
  }

  calculatePercentage(id: string): number {
    const pollItem = this.pollItems().find((pollItem) => pollItem.id === id);
    if (pollItem === undefined) return 0;
    const totalVotes = this.pollItems().reduce((totalVotes, pollItem) => {
      totalVotes = totalVotes + pollItem.numberOfVotes;
      return totalVotes;
    }, 0);
    if (totalVotes === 0) return 0;
    const percentage = Math.floor((100 * pollItem.numberOfVotes) / totalVotes);
    return percentage;
  }
}
