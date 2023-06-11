import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-list/question-form/question-form.component';
import { QuestionService } from './question-list/question.service';
import { QuestionsPageComponent } from './question-list/questions-page/questions-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionComponent } from './question-list/question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteQuestionDialogComponent } from './question-list/question/delete-question-dialog/delete-question-dialog.component';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddAnswerDialogComponent } from './question-list/question/add-answer-dialog/add-answer-dialog.component';
import { UpdateCorrectAnswersDialogComponent } from './question-list/question/update-correct-answers-dialog/update-correct-answers-dialog.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './shared/auth.service';
import { SignupPageComponent } from './user/signup-page/signup-page.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionsPageComponent,
    PageNotFoundComponent,
    QuestionComponent,
    DeleteQuestionDialogComponent,
    AddAnswerDialogComponent,
    UpdateCorrectAnswersDialogComponent,
    LoginPageComponent,
    UserComponent,
    SignupPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdbModalModule  
  ],
  providers: [
      QuestionService,
      MdbModalService,
      AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
