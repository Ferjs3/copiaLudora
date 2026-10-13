import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../models/client';
import { UserService } from '../../services/user-service';

@Component({
  imports: [],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit{

  client = signal<Client>({
    externalId : '1',
    name : 'Maximiliano',
    lastName : 'Suarez',
    userName : 'maxiSuuu',
    email : 'maxisuarez@email.com',
    statusBlocked : true,
    phone : 0,
    street : 'Av algo',
    numberStreet : 0,
    birthDate : new Date(),
    points : 0,
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
