import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  formError: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    if(!this.signinForm.valid){
      return;
    }

    this.service.signIn(this.signinForm.value).subscribe(response => {
      console.log(response);
      if (response && response.token){
        localStorage.setItem("token", response.token)}
    })

    this.router.navigate(['/todo']);
  }

  initializeForm() {
      this.signinForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

}
