import { TestBed } from '@angular/core/testing';

import { Todo.ServiceService } from './todo.service.service';

describe('Todo.ServiceService', () => {
  let service: Todo.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Todo.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
