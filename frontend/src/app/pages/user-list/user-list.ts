import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientResponse } from '../../models/client-response';
import { Developer, Page } from '../../models/developer';
import { UserService } from '../../services/user-service';

type Tab = 'clients' | 'developers';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {

  private userService = inject(UserService)

  tab = signal<Tab>('clients')
  clients = signal<ClientResponse[]>([])
  developers = signal<Developer[]>([])
  page = signal(0)
  totalPages = signal(1)
  loading = signal(false)
  error = signal('')
  readonly size = 10

  ngOnInit(): void {
    this.load()
  }

  setTab(tab: Tab) {
    if (tab === this.tab()) return
    this.tab.set(tab)
    this.page.set(0)
    this.load()
  }

  goTo(page: number) {
    this.page.set(page)
    this.load()
  }

  load() {
    this.loading.set(true)
    this.error.set('')

    if (this.tab() === 'clients') {
      this.userService.getClients(this.page(), this.size).subscribe({
        next: res => {
          this.clients.set(res.content)
          this.setTotalPages(res)
        },
        error: e => this.fail('clientes', e),
      })
    } else {
      this.userService.getDevelopers(this.page(), this.size).subscribe({
        next: res => {
          this.developers.set(res.content)
          this.setTotalPages(res)
        },
        error: e => this.fail('developers', e),
      })
    }
  }

  private setTotalPages(res: Page<unknown>) {
    this.totalPages.set(res.totalPages ?? res.page?.totalPages ?? 1)
    this.loading.set(false)
  }

  private fail(what: string, e: { status?: number }) {
    console.error(e)
    this.loading.set(false)
    this.error.set(`No se pudo cargar la lista de ${what} (código ${e.status ?? 'sin respuesta'}).`)
  }
}