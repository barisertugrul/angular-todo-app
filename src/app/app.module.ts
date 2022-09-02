import { TodoComponent } from './components/todo/todo.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryEditFormComponent } from './components/category-edit-form/category-edit-form.component';
import { TodoEditFormComponent } from './components/todo-edit-form/todo-edit-form.component';
import { TodoContainerComponent } from './containers/todo/todo-container/todo-container.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryEditFormComponent,
    TodoContainerComponent,
    TodoEditFormComponent,
    CategoryFilterComponent,
    TodoItemComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
