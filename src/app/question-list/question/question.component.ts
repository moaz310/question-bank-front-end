import { Component, OnInit, Output } from '@angular/core';
import { Question } from '../question.model';
import {  Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteQuestionDialogComponent } from './delete-question-dialog/delete-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
  question!: Question;
  modalRef: MdbModalRef<DeleteQuestionDialogComponent> | null = null;

  constructor(private service: QuestionService,
            private router: Router,
            private modalService: MdbModalService){}

  ngOnInit(): void {
    this.question = history.state;
  }

  onDelete(){
    this.modalRef = this.modalService.open(DeleteQuestionDialogComponent);
    this.modalRef.onClose.subscribe((message: boolean) => {
      if(message)
      this.service.deleteQuestion(this.question.id).subscribe({
        next: (data) => {
          this.router.navigate(['']);
          console.log(data);
        },
        error: () =>{this.router.navigate(['pageNotFound'])}
      });
    });
  }

  onDeleteAnswer(answerId: string){
    this.service.deleteAnswer(answerId, this.question.id);
  }
}
