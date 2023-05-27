import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-question-dialog',
  templateUrl: './delete-question-dialog.component.html',
  styleUrls: ['./delete-question-dialog.component.css']
})
export class DeleteQuestionDialogComponent {
  
  constructor(public modalRef: MdbModalRef<DeleteQuestionDialogComponent>){}

  onDelete(){
    this.modalRef.close(true);
  }
}
