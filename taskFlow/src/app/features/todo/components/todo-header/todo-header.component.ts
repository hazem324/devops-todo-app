import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls:   ['./todo-header.component.css']
})
export class TodoHeaderComponent {
  @Input() total   = 0;
  @Input() done    = 0;
  @Input() pending = 0;
}
