import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Note } from 'src/app/interfaces/Note.interface';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {
  noteForm!: FormGroup;
  error: boolean = false;

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      'note': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if(!this.noteForm.valid){
      return;
    }
    const newNote: Note = {
      title: this.noteForm.get('note')?.value,
      description: this.noteForm.get('description')?.value
    }
    this.taskService.addTask(newNote).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log(error)
      this.error = true;
    })
    this.noteForm.reset();
  }

}
