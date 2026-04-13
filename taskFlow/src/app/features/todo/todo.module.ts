import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoFiltersComponent } from './components/todo-filters/todo-filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ToastComponent } from './components/toast/toast.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoPageComponent,
    TodoHeaderComponent,
    TodoFormComponent,
    TodoFiltersComponent,
    TodoListComponent,
    TodoItemComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule
  ]
})
export class TodoModule { }
