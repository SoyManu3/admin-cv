import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

 private dbPath = '/header';
  
 headerRef: AngularFirestoreCollection<Header>;



  constructor(private db: AngularFirestore) {
 this.headerRef = db.collection(this.dbPath);
  }
 getHeader(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }

  createHeader(myJob: Header): any {
    const { id, ...jobNoId } = myJob; // Elimina el id si está presente
    return this.headerRef.add(jobNoId);
  }

  deleteHeader(id?: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }

  updateHeader(item: Header,id_a?:string): Promise<void>{
    const { id, ...jobNoId } = item;
    return this.headerRef.doc(id_a).update(item);
    
  }}
