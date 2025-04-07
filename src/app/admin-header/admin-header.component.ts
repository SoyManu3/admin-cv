import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  header: Header[] = [];
  myHeader: Header = new Header();

  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.header = data;
      console.log(this.header);
    });
  }

   AgregarHeader() {
    if (this.isEditing && this.idEnEdicion) {
      this.headerService.updateHeader(this.myHeader, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.headerService.createHeader(this.myHeader).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }

  deleteHeader(id?: string) {
    if (!id) return;
    this.headerService.deleteHeader(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

  prepararEdicion(edu: Header) {
    this.myHeader = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }

  resetForm() {
    this.myHeader = new Header();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }


}

