import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

   AgregarJob() {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (this.isEditing && this.idEnEdicion ) {
      this.workExperienceService.updateWorkExperience(this.myWorkExperience, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }
  
  }

  deleteJob(id?: string) {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (!id ) return;
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
  }

  prepararEdicion(edu: WorkExperience) {
    this.myWorkExperience = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }


}
