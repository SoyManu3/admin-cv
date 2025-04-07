import { Component } from '@angular/core';
import { InteretsService } from '../services/interests-service/interets.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  interests: Interests[] = [];
  isEditing: boolean = false;
  idEnEdicion: string | null = null;
  myInterests: Interests = new Interests();
 

  constructor(public interestsService: InteretsService) {
    console.log(this.interestsService);
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.interests = data;
      console.log(this.interests);
    });
  }

   AgregarInterests() {
    if (this.isEditing && this.idEnEdicion) {
      this.interestsService.updateInterest(this.myInterests, this.idEnEdicion).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.interestsService.createInterests(this.myInterests).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }

  deleteInterests(id?: string) {
    if (!id) return;
    this.interestsService.deleteInterest(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  }

 
  prepararEdicion(edu: Interests) {
    this.myInterests = { ...edu }; 
    this.btnTxt = "Actualizar";
    this.isEditing = true;
    this.idEnEdicion = edu.id || null;
  }

  resetForm() {
    this.myInterests = new Interests();
    this.btnTxt = "Agregar";
    this.isEditing = false;
    this.idEnEdicion = null;
  }


}
