import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GameService } from '../../services/game-service';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-catalog',
  styleUrl: './catalog.css',
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  private gameService = inject(GameService);

  games = signal<Game[]>([]);
  isLoading = signal<boolean>(true);

  page = signal(0);
  size = signal(18);
  totalPages = signal(0);

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.page() + 1;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total];
    } else if (current >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    } else {
      return [1, '...', current - 1, current, current + 1, '...', total];
    }
  });

  goToPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.page.set(pageNumber - 1); 
      this.loadGames();
    }
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.isLoading.set(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.gameService.getGames(this.page(), this.size()).subscribe({
      next: (data) => {
        this.games.set(data.content);
        this.totalPages.set(data.totalPages);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el catálogo', err);
        this.isLoading.set(false);
      }
    });
  }

  nextPage() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(p => p + 1);
      this.loadGames();
    }
  }

  prevPage() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.loadGames();
    }
  }

}