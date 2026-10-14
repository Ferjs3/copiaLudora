import { Component, inject, OnInit, signal } from '@angular/core';
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

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el catálogo', err);
        this.isLoading.set(false);
      }
    });
  }
}
