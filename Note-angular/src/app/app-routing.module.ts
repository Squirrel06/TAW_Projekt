import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { TodoItemEditComponent } from './components/todo-item-edit/todo-item-edit.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TokenGuard } from './guards/token.guard';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'todo', component: TodoMainComponent, canActivate:[TokenGuard] },
  { path: 'todo/edit/:id', component: TodoItemEditComponent, canActivate:[TokenGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
