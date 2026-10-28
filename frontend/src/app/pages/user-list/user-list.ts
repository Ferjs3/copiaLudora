import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientResponse } from '../../models/client-response';
import { Developer, Page } from '../../models/developer';
import { UserService } from '../../services/user-service';

type Tab = 'clients' | 'developers';

type Blockable = { externalId: string; statusBlocked: boolean }

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
  busyId = signal<string | null>(null)
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

  toggleBlock(user: Blockable) {
    if (this.busyId()) return
    const block = !user.statusBlocked
    this.busyId.set(user.externalId)
    this.error.set('')

    const request = block
      ? this.userService.blockAccount(user.externalId)
      : this.userService.unblockAccount(user.externalId)

    request.subscribe({
      next: () => {
        this.clients.update(list => this.withStatus(list, user.externalId, block))
        this.developers.update(list => this.withStatus(list, user.externalId, block))
        this.busyId.set(null)
      },
      error: e => {
        console.error(e)
        this.busyId.set(null)
        this.error.set(`No se pudo ${block ? 'bloquear' : 'desbloquear'} la cuenta (código ${e.status ?? 'sin respuesta'}).`)
      },
    })
  }

  private withStatus<T extends Blockable>(list: T[], id: string, blocked: boolean): T[] {
    return list.map(u => u.externalId === id ? { ...u, statusBlocked: blocked } : u)
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