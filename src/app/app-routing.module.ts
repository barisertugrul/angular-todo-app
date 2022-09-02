import { TodoComponent } from './components/todo/todo.component';
import { TodoContainerComponent } from './containers/todo/todo-container/todo-container.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "",
    redirectTo: "todos",
    pathMatch: "full"
  },
  { path: "todos",
    component: TodoContainerComponent,
    children: [
      { path: '', component: TodoComponent },
      { path: 'category/all', component: TodoComponent },
      { path: 'category/uncategorized', component: TodoComponent },
      { path: 'category/:categoryId', component: TodoComponent }
    ]
  },
  { path: "categories",
    component: CategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
