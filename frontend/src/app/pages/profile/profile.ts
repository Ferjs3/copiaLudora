import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../models/client';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { ClientResponse } from '../../models/client-response';
import { Developer } from '../../models/developer';
import { AdminResponse } from '../../models/admin-response';

@Component({
  imports: [RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile{

  user = signal<ClientResponse | Developer | AdminResponse | null>(null)

  clientService = inject(UserService)

  constructor(){

  }

  loadUser(){
    
  }

}
