import { RouterModule } from '@angular/router';
import { TodoComponent } from './../../../components/todo/todo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { todoContainerRoutes } from './todo-container-routing.module';
import { TodoContainerComponent } from './todo-container.component';
import { TodoEditFormComponent } from 'src/app/components/todo-edit-form/todo-edit-form.component';
import { CategoryFilterComponent } from 'src/app/components/category-filter/category-filter.component';
import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';


@NgModule({
  declarations: [
    //TodoContainerComponent,
    //TodoComponent,
    //TodoEditFormComponent,
    //CategoryFilterComponent,
    //TodoItemComponent
  ],
  imports: [
    CommonModule,
    //TodoContainerRoutingModule
    //RouterModule.forChild(todoContainerRoutes)
  ]
})
export class TodoContainerModule { }
