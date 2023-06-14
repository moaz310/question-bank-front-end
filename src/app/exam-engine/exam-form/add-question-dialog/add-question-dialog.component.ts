import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent {
  
  constructor(public modalRef: MdbModalRef<AddQuestionDialogComponent>){
  }
  
  onAddQuestions() {
  }
}
