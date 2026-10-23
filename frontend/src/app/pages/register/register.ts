import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { ClientRequest } from '../../models/client-request';

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
      nameT:  ['', [Validators.required , Validators.maxLength(32), Validators.minLength(3)]],
      lastNameT: ['', [Validators.required , Validators.maxLength(32), Validators.minLength(3)]],
      userNameT: ['', [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]] ,
      emailT: ['', [Validators.required , Validators.email]],
      passwordT: ['', Validators.required ] ,
      password2T: ['',Validators.required ] ,
      phoneT: ['', [Validators.required , Validators.min(1000000) , Validators.max(99999999999)]],
      streetT: ['',[ Validators.required , Validators.maxLength(25)]],
      numberStreetT: ['', [Validators.required , Validators.min(1) , Validators.max(99999) , Validators.pattern('^[0-9]+$')]],
      birthDateT: ['', Validators.required ]
    });

  }

  onSubmit(){
    const clientData : ClientRequest = this.clientForm.value;

    this.userService.addUser(clientData).subscribe({
      next: (data)=> {
        console.log('usuario cargado con exito',data);
        this.router.navigate(['/login']);},
      error: (err) => {
        console.error('Error al registrar el usuario', err);
      }
    })
  }

}
