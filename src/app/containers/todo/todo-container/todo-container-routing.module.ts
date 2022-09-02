import { TodoComponent } from './../../../components/todo/todo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const todoContainerRoutes: Routes = [
  { path: "todos",
    component: TodoComponent
  },
  { path: "todos/category/all",
    component: TodoComponent
  },
  { path: "todos/category/uncategorized",
    component: TodoComponent
  },
  { path: "todos/category/:categoryId",
    component: TodoComponent
  }
];
/*
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoContainerRoutingModule { }
 */
