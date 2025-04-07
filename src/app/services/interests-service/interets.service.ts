import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InteretsService {
  private dbPath ='/interests';
  interestsRef: AngularFirestoreCollection<Interests>;


  constructor(private db: AngularFirestore) { 
    this.interestsRef = db.collection(this.dbPath);
  }
  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }

  createInterests(myJob: Interests): any {
    const { id, ...jobNoId } = myJob; // Elimina el id si está presente
    return this.interestsRef.add(jobNoId);
  }

  deleteInterest(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }

  updateInterest(item: Interests,id_a?:string): Promise<void>{
    const { id, ...jobNoId } = item;
    return this.interestsRef.doc(id_a).update(item);
    
  }


  }
