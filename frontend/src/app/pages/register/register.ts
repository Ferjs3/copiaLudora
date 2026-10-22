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
      name:  ['', [Validators.required , Validators.maxLength(32), Validators.minLength(3)]],
      lastName: ['', [Validators.required , Validators.maxLength(32), Validators.minLength(3)]],
      userName: ['', [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]] ,
      email: ['', [Validators.required , Validators.email]],
      password: ['', Validators.required ] ,
      password2: ['',Validators.required ] ,
      phone: ['', [Validators.required , Validators.min(1000000) , Validators.max(99999999999)]],
      street: ['',[ Validators.required , Validators.maxLength(25)]],
      numberStreet: ['', [Validators.required , Validators.min(1) , Validators.max(99999) , Validators.pattern('^[0-9]+$')]],
      birthDate: ['', Validators.required ]
    });

    this.clientId = this.route.snapshot.params['externalId'];

    if(this.clientId){
      this.userService.getMyUserId(this.clientId)
      .subscribe(user => this.clientForm.patchValue(user))
    }

  }

  onSubmit(){

    if(this.clientId){

      const clientupdate : ClientRequest = { externalId : this.clientId ,... this.clientForm.value};

      this.userService.putUser(clientupdate)
      .subscribe({
        next: () => alert('Actualizacion correcta'),
        error: (e) => [console.log('aca hay un error',e),
          alert('Hay un error al actulizar los datos')
        ]
      })
    }else{
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

}
