import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../models/client';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit{

  client = signal<Client>({
    externalId : '1',
    name : 'Maximiliano',
    lastName : 'Suarez',
    userName : 'maxiSiuuu',
    email : 'maxisuarez@email.com',
    statusBlocked : true,
    phone : 2235658440,
    street : 'Av algo',
    numberStreet : 123,
    birthDate : '22-08-1994',
    points : 350,
  })

  clientService = inject(UserService)


  ngOnInit(): void {
    this.loadClient()
  }

  loadClient(){
    this.clientService.getMyUser().subscribe({
      next: data => {}, /*this.client.set(data)*/
      error: e => {
        // alert('Hubo un error al cargar sus datos')
        // console.error(e)
      }
    })
  }
}
