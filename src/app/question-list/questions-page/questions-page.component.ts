import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css']
})


export class QuestionsPageComponent implements OnInit{
  
  questions: Question[] = [];
  page!: number;
  constructor(
    private questioService: QuestionService,
    private route: ActivatedRoute,
    private router: Router){}
  
  ngOnInit(): void {
    this.page = this.route.snapshot.params['page'];
    this.setQuestions();
    this.route.
    params.
    subscribe((params: Params) => {
      this.page = params['page'];
      this.setQuestions();
    })
  }

  setQuestions(): void {
    console.log(this.page);
    this.questioService.
      getQuestions(this.page).
      subscribe({
        next: (data) => {
          this.questions = data['questions'];
        },
        error: (e) =>{this.router.navigate(['pageNotFound'])}
    });
  }
}
