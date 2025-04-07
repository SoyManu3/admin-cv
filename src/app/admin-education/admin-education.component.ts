import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {

  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  education: Education[] = [];
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  myEducation: Education = new Education();

  constructor(public educationService: EducationService) {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }

  AgregarEducation() {
    if (this.isEditing && this.idEnEdicion) {
      this.educationService.updateEducation(this.myEducation, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }
  

  deleteEducation(id?: string) {
    if (!id) return;
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }


  prepararEdicion(edu: Education) {
    this.myEducation = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }
  resetForm() {
    this.myEducation = new Education();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }
  



}
