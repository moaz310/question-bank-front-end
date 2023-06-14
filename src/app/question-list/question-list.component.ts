import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{

  pages !: number[];
  private start = 1;
  end!: number;
  currentPage : number = 1;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private questionService: QuestionService){  }


  ngOnInit(): void {
    this.questionService.getTotal()
    .subscribe({
      next: (end) => {
        this.fillArray(end);
        this.goToPage(this.currentPage);
      },
      error: (e) =>{this.router.navigate(['pageNotFound'])}
    });
    //this.goToPage(this.currentPage);
  }
  
  
  fillArray(data: number) {
    this.end = Math.floor(data/5);
    this.pages =  [...Array(this.end - this.start + 1).keys()].map(x => x + this.start);
  }
  
  goToPage(page: number){
    this.currentPage = page;
    console.log(this.activeRoute)
    this.router.navigate(['page', page], {relativeTo: this.activeRoute})
  }

  updateCurrentPage(page: number){
    this.currentPage = page;
  }
  
}

