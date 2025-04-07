import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/languages';

  languagesRef : AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
   }
   getLanguages(): AngularFirestoreCollection<Languages> {
    return this.languagesRef;
  }

  createLanguages(myJob: Languages): any {
    const { id, ...jobNoId } = myJob; // Elimina el id si está presente
    return this.languagesRef.add(jobNoId);
  }

  deleteLanguages(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }

  updateLanguages(item: Languages,id_a?:string): Promise<void>{
    const { id, ...jobNoId } = item;
    return this.languagesRef.doc(id_a).update(item);
    
  }
  





}
