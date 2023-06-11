import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/interfaces/Note.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  formError: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    if(!this.signupForm.valid){
      return;
    }

    this.service.signUp(this.signupForm.value).subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/todo']);
  }

  initializeForm() {
      this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required)
    });
  }
}
