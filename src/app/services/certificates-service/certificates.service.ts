import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';
@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  private dbPath ='/certificates';
    certificatesRef: AngularFirestoreCollection<Certificates>;
  
  
    constructor(private db: AngularFirestore) { 
      this.certificatesRef = db.collection(this.dbPath);
    }
    getCertificates(): AngularFirestoreCollection<Certificates> {
      return this.certificatesRef;
    }
  
    createCertificates(myJob: Certificates): any {
      const { id, ...jobNoId } = myJob; // Elimina el id si está presente
      return this.certificatesRef.add(jobNoId);
    }
  
    deleteCertificates(id?: string): Promise<void> {
      return this.certificatesRef.doc(id).delete();
    }

    updateCertificates(item: Certificates,id_a?:string): Promise<void>{
      const { id, ...jobNoId } = item;
      return this.certificatesRef.doc(id_a).update(item);
      
    }
  
  }
