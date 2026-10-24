import { Component, inject, OnInit, signal } from '@angular/core';
import { GameService } from '../../services/game-service';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { Reviews } from '../../components/reviews/reviews';

@Component({
  imports: [CommonModule, Reviews],
  selector: 'app-catalog',
  styleUrl: './catalog.css',
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  private gameService = inject(GameService);

  games = signal<Game[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadGames(0);
  }

  loadGames(page: number = 0) {
    this.isLoading.set(true);
    this.gameService.getGames(page, 50).subscribe({
      next: (data) => {
        this.games.set(data.content);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el catálogo', err);
        this.isLoading.set(false);
      }
    });
  }

}