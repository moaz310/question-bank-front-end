import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';

const routes: Routes = [
  {path: 'question', component: QuestionComponent},
  {path: 'questionForm', component: QuestionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
