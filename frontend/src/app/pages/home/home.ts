import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Game {
  externalId: string;
  name: string;
  price: number;
  developer: string;
  description: string;
  releaseDate: Date;
  agerange: string;
  genres: string[];
  imageUrl: string;
}

export interface FilterChip {
  id: string;
  label: string;
  queryParam: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  @ViewChild('chipsScroll', { static: false }) chipsScroll!: ElementRef<HTMLDivElement>;

  currentIndex: number = 0;
  private autoPlayTimer: any;
  readonly intervalMs: number = 4500;

  /* --- Chips de Navegación --- */
  activeChipId: string = 'all';

  chips: FilterChip[] = [
    { id: 'all', label: 'Todos', queryParam: 'all' },
    { id: 'offers', label: '🔥 En Oferta', queryParam: 'offers' },
    { id: 'pc', label: 'PC Windows', queryParam: 'pc' },
    { id: 'ps5', label: 'PlayStation 5', queryParam: 'ps5' },
    { id: 'xbox', label: 'Xbox Series X/S', queryParam: 'xbox' },
    { id: 'switch', label: 'Nintendo Switch', queryParam: 'switch' },
    { id: 'rpg', label: 'RPG', queryParam: 'rpg' },
    { id: 'action', label: 'Acción', queryParam: 'action' },
    { id: 'indie', label: 'Indie', queryParam: 'indie' },
    { id: 'f2p', label: 'Gratis', queryParam: 'f2p' },
    { id: 'multiplayer', label: 'Cooperativo', queryParam: 'multiplayer' },
    { id: 'strategy', label: 'Estrategia', queryParam: 'strategy' }
  ];

  games: Game[] = [
    {
      externalId: 'ext-gow-ragnarok',
      name: 'God of War Ragnarök',
      price: 59.99,
      developer: 'Santa Monica Studio',
      description: 'Kratos y Atreus se embarcan en una mítica aventura en busca de respuestas antes de la batalla profetizada que acabará con el mundo.',
      releaseDate: new Date('2022-11-09'),
      agerange: '+18',
      genres: ['Acción', 'Aventura', 'Mitología'],
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg?t=1776465233'
    },
    {
      externalId: 'ext-spiderman-2018',
      name: "Marvel's Spider-Man",
      price: 39.99,
      developer: 'Insomniac Games',
      description: 'Recorré las calles de Nueva York balanceándote con telarañas y enfrentate a villanos icónicos mientras equilibrás la doble vida de Peter Parker.',
      releaseDate: new Date('2018-09-07'),
      agerange: '+16',
      genres: ['Acción', 'Mundo Abierto', 'Superhéroes'],
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2651280/header.jpg?t=1763569811'
    },
    {
      externalId: 'ext-warcraft-3',
      name: 'Warcraft III: Reign of Chaos',
      price: 19.99,
      developer: 'Blizzard Entertainment',
      description: 'Comandá humanos, orcos, no-muertos y elfos de la noche en el legendario RTS que definió la historia de Azeroth.',
      releaseDate: new Date('2002-07-03'),
      agerange: '+13',
      genres: ['Estrategia', 'RTS', 'Fantasía'],
      imageUrl: 'https://i.blogs.es/juegos/2647/warcraft_iii_reign_of_chaos/fotos/noticias/warcraft_iii_reign_of_chaos-3960289.jpg'
    },
    {
      externalId: 'ext-bg3',
      name: "Baldur's Gate 3",
      price: 59.99,
      developer: 'Larian Studios',
      description: 'Reuní a tu grupo y regresá a los Reinos Olvidados en un RPG por turnos de toma de decisiones profundas ambientado en Dungeons & Dragons.',
      releaseDate: new Date('2023-08-03'),
      agerange: '+18',
      genres: ['RPG', 'Estrategia por turnos', 'Fantasía'],
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header.jpg?t=1777363040'
    }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.intervalMs);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.games.length;
    this.resetTimer();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.games.length) % this.games.length;
    this.resetTimer();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.resetTimer();
  }

  private resetTimer(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

}