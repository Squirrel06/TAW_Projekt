import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/Note.interface';
import { filter, map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  isUpdated: Subject<boolean> = new Subject();
  url = "http://localhost:3001/api"

  constructor(private http: HttpClient) { }

  getNote() {
    return this.http.get<Note[]>(this.url+"/notes")
      

  }

  addTask(note: Note) {
    return this.http.post(this.url+"/note", note).pipe(tap( ()=> {
      this.isUpdated.next(true);
    }));
  }

  deleteAllTasks() {
    return this.http.delete(`https://todo-angular-f6450-default-rtdb.firebaseio.com/tasks.json`).pipe(tap(() => {
      this.isUpdated.next(true);
    }));
  }

  deleteTask(id?: string) {
    return this.http.delete(this.url+"/note/"+id).pipe(tap(()=> {
      this.isUpdated.next(true);
    }))
  }

  getTask(id: string) {
    return this.http.get<Note>(this.url+"/note/"+id);
  }

  editTask(newNote: Note) {
    return this.http.post(this.url+"/note", newNote).pipe(tap( () => {
      this.isUpdated.next(true);
    }));
  }
}
