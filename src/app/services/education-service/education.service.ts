import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  
  educationRef: AngularFirestoreCollection<Education>;
 
 
 
   constructor(private db: AngularFirestore) {
  this.educationRef = db.collection(this.dbPath);
   }
  getEducation(): AngularFirestoreCollection<Education> {
     return this.educationRef;
   }
 
   createEducation(myJob: Education): any {
     const { id, ...jobNoId } = myJob; // Elimina el id si está presente
     return this.educationRef.add(jobNoId);
   }
 
   deleteEducation(id?: string): Promise<void> {
     return this.educationRef.doc(id).delete();
     
   }
  
   updateEducation(item: Education,id_a?:string): Promise<void>{
    const { id, ...jobNoId } = item;
    return this.educationRef.doc(id_a).update(item);
    
  }
  
 

}
