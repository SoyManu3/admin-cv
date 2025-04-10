import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {

  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  skills: Skills[] = [];
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  mySkills: Skills = new Skills();

  constructor(public skillsService: SkillsService) {
    console.log(this.skillsService);
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.skills = data;
      console.log(this.skills);
    });
  }


  AgregarSkill() {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (this.isEditing && this.idEnEdicion &&a) {
      this.skillsService.updateSkills(this.mySkills, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.skillsService.createSkills(this.mySkills).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }
  }

  deleteSkill(id?: string) {
    const a=window.confirm("Estas seguro?");
    if(a){
    if (!id ) return;
    this.skillsService.deleteSkills(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }
}

  prepararEdicion(edu: Skills) {
    this.mySkills = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }

  resetForm() {
    this.mySkills = new Skills();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }




}
