import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register implements OnInit {

  clientForm!: FormGroup;
  clientId?: string;

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private userService = inject(UserService)

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name:['' , Validators.required]
    })
  }



}
