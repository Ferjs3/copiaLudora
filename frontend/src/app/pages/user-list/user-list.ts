import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from '../../models/client';
import { UserService } from '../../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {

  clients = signal<Client[]>([
    {
      externalId: '1',
      name: 'Maximiliano',
      lastName: 'Suarez',
      userName: 'maxiSuuu',
      email: 'maxisuarez@email.com',
      statusBlocked: true,
      phone: 2235658440,
      street: 'Av algo',
      numberStreet: 123,
      birthDate: '22-08-1994',
      points: 350,
    },
    {
      externalId: '2',
      name: 'Lucia',
      lastName: 'Gomez',
      userName: 'luGomez',
      email: 'lucia@email.com',
      statusBlocked: false,
      phone: 2235001122,
      street: 'Calle falsa',
      numberStreet: 456,
      birthDate: '10-03-1998',
      points: 120,
    },
  ])

  userService = inject(UserService)

  ngOnInit(): void {
    this.loadClients()
  }

  loadClients() {
    this.userService.getAllUsers().subscribe({
      next: data => {}, /*this.clients.set(data)*/
      error: e => {
        // alert('Hubo un error al cargar los usuarios')
        // console.error(e)
      }
    })
  }

  setBlocked(client: Client, blocked: boolean) {
    // Mientras no haya backend, se actualiza solo en pantalla
    this.clients.update(list =>
      list.map(c => c.externalId === client.externalId
        ? { ...c, statusBlocked: blocked }
        : c)
    )

    // if (!client.externalId) return
    // this.userService.setBlocked(client.externalId, blocked).subscribe({
    //   next: () => this.clients.update(list =>
    //     list.map(c => c.externalId === client.externalId
    //       ? { ...c, statusBlocked: blocked }
    //       : c)
    //   ),
    //   error: e => console.error(e)
    // })

    //(CAMBIAR CUANDO CONECTEMOS  CON BACK)
  }
}