import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  languages: Languages[] = [];
  myLanguages: Languages = new Languages();

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    });
  }

   AgregarLanguages() {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (this.isEditing && this.idEnEdicion &&a) {
      this.languagesService.updateLanguages(this.myLanguages, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.languagesService.createLanguages(this.myLanguages).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }
  }

  deleteLanguages(id?: string) {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (!id &&a) return;
    this.languagesService.deleteLanguages(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
  }

  prepararEdicion(edu: Languages) {
    this.myLanguages = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }

  resetForm() {
    this.myLanguages = new Languages();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }



}
