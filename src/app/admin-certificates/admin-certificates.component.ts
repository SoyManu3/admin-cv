import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  certificates: Certificates[] = [];
  myCertificates: Certificates = new Certificates();

  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    });
  }

  AgregarCertificates() {
    if (this.isEditing && this.idEnEdicion) {
      this.certificatesService.updateCertificates(this.myCertificates, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.certificatesService.createCertificates(this.myCertificates).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }

  deleteCertificate(id?: string) {
    if (!id) return;
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

  prepararEdicion(edu: Certificates) {
    this.myCertificates = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }
  resetForm() {
    this.myCertificates = new Certificates();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }



}
