import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

import { QuestionService } from '../question.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteQuestionDialogComponent } from './delete-question-dialog/delete-question-dialog.component';
import { AddAnswerDialogComponent } from './add-answer-dialog/add-answer-dialog.component';
import { Answer } from '../answer.model';


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
            private location: Location,
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
          this.location.back();
          console.log(data);
        },
        error: () =>{this.router.navigate(['pageNotFound'])}
      });
    });
  }

  onDeleteAnswer(answerId: string, index: number){
    this.service.deleteAnswer(answerId, this.question.id).subscribe({
      next: (response)=>{
        console.log(response);
        this.question.answers.splice(index, 1);
        this.resetState();
      },
      error: (err) => {console.log(err)}
    });
  }

  onAddAnswer(){
    this.modalRef = this.modalService.open(AddAnswerDialogComponent);
    this.modalRef.onClose.subscribe((answer: Answer)=>{
      if(answer.name != null){
        this.service.addAnswer(this.question.id, answer).subscribe({
          next: (response)=>{
            this.question.answers.push(response);
            this.resetState();
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }
    })
  }

  resetState(): void {
    const url = this.router.url;
    const state = this.question;
    this.location.replaceState(url, '', state);
  }
}
