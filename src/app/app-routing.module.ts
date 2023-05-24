import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-list/question-form/question-form.component';
import { QuestionsPageComponent } from './question-list/questions-page/questions-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionComponent } from './question-list/question/question.component';

const routes: Routes = [
  {path: 'questionList', component: QuestionListComponent, children: [
    {path: 'questionPage/:page', component: QuestionsPageComponent},
    {path: 'question/:Id', component: QuestionComponent}
  ]},
  {path: 'questionForm', component: QuestionFormComponent},
  {path: '', redirectTo: '/questionList/questionPage/1', pathMatch: 'full' },
  {path: 'questionList/', redirectTo: '/questionList/questionPage/1', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
