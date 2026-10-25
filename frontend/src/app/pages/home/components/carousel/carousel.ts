import { Component, input, effect, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Game } from '../../../../models/game';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  items = input.required<Game[]>();

  displayGames: Game[] = [];
  currentIndex: number = 1; 
  withTransition: boolean = true;
  private isAnimating: boolean = false;
  private autoPlayTimer: any;
  readonly intervalMs: number = 2500;

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly minSwipeDistance: number = 50;

  constructor() {
    effect(() => {
      const games = this.items();
      if (games && games.length > 0) {
        if (games.length > 1) {
          this.displayGames = [games[games.length - 1], ...games, games[0]];
          this.currentIndex = 1;
        } else {
          this.displayGames = [...games];
          this.currentIndex = 0;
        }
        this.withTransition = true;
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Mapea el currentIndex a los puntos de navegación sin desfasarse
  get activeDotIndex(): number {
    const total = this.items().length;
    if (total <= 1) return 0;
    if (this.currentIndex === 0) return total - 1;
    if (this.currentIndex === total + 1) return 0;
    return this.currentIndex - 1;
  }

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

  next(): void {
    const total = this.items().length;
    if (total <= 1 || this.isAnimating) return;

    this.isAnimating = true;
    this.withTransition = true;
    this.currentIndex++;
    this.resetTimer();
  }

  prev(): void {
    const total = this.items().length;
    if (total <= 1 || this.isAnimating) return;

    this.isAnimating = true;
    this.withTransition = true;
    this.currentIndex--;
    this.resetTimer();
  }

  goTo(index: number): void {
    if (this.isAnimating) return;
    this.withTransition = true;
    this.currentIndex = index + 1;
    this.resetTimer();
  }

  // Se ejecuta exactamente cuando la transicion CSS termina en pantalla
  onTransitionEnd(): void {
    this.isAnimating = false;
    const total = this.items().length;
    if (total <= 1) return;

    // Si llegó al clon del final (después del último juego real)
    if (this.currentIndex === total + 1) {
      this.withTransition = false; // Apaga la animación
      this.currentIndex = 1;       // Salta al primer juego real sin que el ojo lo note
      this.cdr.detectChanges();
    }

    // Si retrocedió antes del primer juego real (clon del último)
    if (this.currentIndex === 0) {
      this.withTransition = false; // Apaga la animación
      this.currentIndex = total;   // Salta al último juego real
      this.cdr.detectChanges();
    }
  }

  private resetTimer(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

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