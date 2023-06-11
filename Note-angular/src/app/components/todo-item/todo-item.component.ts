import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/interfaces/Note.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() note!: Note;
  @Output() deleteEmitter: EventEmitter<Note> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDelete(note: Note) {
    this.deleteEmitter.emit(note);
  }

  onEdit() {
    this.router.navigate(['edit', this.note.id], { relativeTo: this.route });
  }
}
