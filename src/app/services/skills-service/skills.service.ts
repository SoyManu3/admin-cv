import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';



@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath ='/skills';
  skillsRef: AngularFirestoreCollection<Skills>;


  constructor(private db: AngularFirestore) { 
    this.skillsRef = db.collection(this.dbPath);
  }
  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createSkills(myJob: Skills): any {
    const { id, ...jobNoId } = myJob; // Elimina el id si está presente
    return this.skillsRef.add(jobNoId);
  }

  deleteSkills(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }

  updateSkills(item: Skills,id_a?:string): Promise<void>{
    const { id, ...jobNoId } = item;
    return this.skillsRef.doc(id_a).update(item);
    
  }


}
