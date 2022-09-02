# AngularTodoApp

## Angular Todo Project that works with your browser's memory using local storage, and its information is not lost when the page is refreshed.

Live Demo: [http://angulartodoapp.demoistasyonu.com](http://angulartodoapp.demoistasyonu.com)

![Todo App Screenshot](https://github.com/barisertugrul/angular-todo-app/blob/master/assets/screenshots/Todo-App-Device-Screenshot-1.png)

* The use of localstorage is exemplified. It * is also ready for API use.
* Observable-Subscribe techniques are used for data extraction in components.
* It is category based. And categories can be assigned bootstrap base colors.
* Todo information is Todo name, Category, deadline and description.
* Completed todos can be marked as strikethrough text using the checkbox.
* Adding, deleting and updating processes have been applied for both categories and todos.
* Todos can be filtered by category.
* Filtering by categories was done in the container component. Thus, the child routing process is shown.
* For the purposes of illustration, adding operations were done directly on the lists, and editing/updating operations were done via the modal form.

# Improvement suggestions:
* Getting confirmation from the user during the deletion process
* Sorting todos with drag and drop methods
* Toast notification system for process results and errors
* Alert system for upcoming todos
* User authentication and authorization
* Multi-user system

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
