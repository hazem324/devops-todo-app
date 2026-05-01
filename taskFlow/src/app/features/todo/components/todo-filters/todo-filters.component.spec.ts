import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoFiltersComponent } from './todo-filters.component';

describe('TodoFiltersComponent', () => {
  let component: TodoFiltersComponent;
  let fixture: ComponentFixture<TodoFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFiltersComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
