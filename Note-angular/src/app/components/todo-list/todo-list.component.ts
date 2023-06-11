import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/interfaces/Note.interface';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  noteList!: Note[];
  listSubscription!: Subscription;
  listLoading: boolean = false;

  constructor(private taskSerivce: TaskServiceService) { }

  ngOnInit(): void {
    this.getNotes();

    this.listSubscription = this.taskSerivce.isUpdated.subscribe(response => {
      if(response === true) {
        this.getNotes();
      }
    })
  }

  getNotes() {
    this.listLoading = true;
    this.taskSerivce.getNote().subscribe(response => {
      this.listLoading = false;
      this.noteList = response;
    })
  }

  deleteAll() {
    this.taskSerivce.deleteAllTasks().subscribe(response => {
      console.log(response);
    })
  }

  deleteOneTask(note: Note) {
    this.taskSerivce.deleteTask(note.id).subscribe(response => {
      console.log(response);
    })
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
