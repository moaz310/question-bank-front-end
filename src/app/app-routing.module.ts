import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-list/question-form/question-form.component';
import { QuestionsPageComponent } from './question-list/questions-page/questions-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionComponent } from './question-list/question/question.component';
import { LoginPageComponent } from './user/login-page/login-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'questions-list', component: QuestionListComponent, children: [
    {path: 'page/:page', component: QuestionsPageComponent},
  ]},
  {path: 'question/:Id', component: QuestionComponent},
  {path: 'question-form', component: QuestionFormComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
