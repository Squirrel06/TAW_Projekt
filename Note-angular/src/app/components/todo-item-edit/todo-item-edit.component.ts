import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/interfaces/Note.interface';

@Component({
  selector: 'app-todo-item-edit',
  templateUrl: './todo-item-edit.component.html',
  styleUrls: ['./todo-item-edit.component.scss']
})
export class TodoItemEditComponent implements OnInit {
  note!: Note;
  editNoteForm!: FormGroup;
  noteId!: string;
  formError: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.noteId = this.route.snapshot.params['id'];
    this.taskService.getTask(this.noteId).subscribe(response => {
      this.note = response;
      this.setDataInForm();
    });
  }

  onSubmit() {
    if(!this.editNoteForm.valid){
      return;
    }
    const editedNote: Note = {
      id: this.noteId,
      title: this.editNoteForm.get('note')?.value,
      description: this.editNoteForm.get('description')?.value
    }

    this.taskService.editTask(editedNote).subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/todo']);
  }

  initializeForm() {
      this.editNoteForm = new FormGroup({
      'note': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  setDataInForm() {
    this.editNoteForm.get('note')?.setValue(this.note.title);
    this.editNoteForm.get('description')?.setValue(this.note.description);
  }

}
