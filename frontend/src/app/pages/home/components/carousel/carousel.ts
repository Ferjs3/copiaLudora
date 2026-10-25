import { Component, input, effect, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Game } from '../../../../models/game'; // Ajustá la ruta hacia tu modelo Game

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnDestroy {
  
  // entrada de datos desde el home
  items = input.required<Game[]>();

  // lista, incluye el clon al final para el loop infinito
  displayGames: Game[] = [];

  currentIndex: number = 0;
  withTransition: boolean = true;
  private autoPlayTimer: any;
  readonly intervalMs: number = 4500;

  // desliz de diapositivas
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly minSwipeDistance: number = 50;

  constructor() {
    // escucha cuando llegan o cambian los juegos para armar el loop
    effect(() => {
      const games = this.items();
      if (games && games.length > 0) {
        this.displayGames = games.length > 1 ? [...games, games[0]] : [...games];
        this.currentIndex = 0;
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // reproducción automática
  startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.items().length <= 1) return;

    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.intervalMs);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  // navegación
  next(): void {
    const total = this.items().length;
    if (total <= 1) return;

    this.withTransition = true;
    this.currentIndex++;

    // si llega al clon del final
    if (this.currentIndex === total) {
      setTimeout(() => {
        // apaga la animación y vuelve al inicio invisiblemente
        this.withTransition = false;
        this.currentIndex = 0;
      }, 450);
    }

    this.resetTimer();
  }

  prev(): void {
    const total = this.items().length;
    if (total <= 1) return;

    if (this.currentIndex === 0) {
      // salto instantáneo al clon final sin transición
      this.withTransition = false;
      this.currentIndex = total;

      // en el siguiente tick anima hacia el penúltimo
      setTimeout(() => {
        this.withTransition = true;
        this.currentIndex--;
      }, 20);
    } else {
      this.withTransition = true;
      this.currentIndex--;
    }

    this.resetTimer();
  }

  goTo(index: number): void {
    this.withTransition = true;
    this.currentIndex = index;
    this.resetTimer();
  }

  private resetTimer(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // eventos táctiles para mobile
  onTouchStart(e: TouchEvent): void {
    this.stopAutoPlay();
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
    this.startAutoPlay();
  }

  private handleSwipe(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (swipeDistance < -this.minSwipeDistance) {
      this.next();
    } else if (swipeDistance > this.minSwipeDistance) {
      this.prev();
    }
  }
}