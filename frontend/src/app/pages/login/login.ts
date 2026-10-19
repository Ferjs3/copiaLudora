import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit{

  service = inject(AuthService)
  form! : FormGroup
  fb = inject(FormBuilder)
  router = inject(Router)

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit(){

    if(this.form.invalid) return

    this.service.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: e => {
        // --------- logic for error ----------------------
      }
    })
  }
}
