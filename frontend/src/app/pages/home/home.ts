import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { Carousel } from './components/carousel/carousel';
import { GameService } from '../../services/game-service';
import { CategorySlide } from './components/category-slide/category-slide';
import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre-service'; 
import { Search } from './components/search/search';

export interface FilterChip {
  id: string;
  label: string;
  queryParam: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Search, Carousel, CategorySlide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private gameService = inject(GameService);
  private genreService = inject(GenreService);

  featuredGames = signal<Game[]>([]);
  genres = signal<Genre[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadFeaturedGames();
    this.loadGenres(); 
  }

  loadFeaturedGames(): void {
    this.isLoading.set(true);
    this.gameService.getGames(0, 8).subscribe({
      next: (response) => {
        this.featuredGames.set(response.content);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar juegos destacados para el home', err);
        this.isLoading.set(false);
      }
    });
  }

  // 4. Método que trae los géneros de la base de datos
  loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (data) => {
        this.genres.set(data);
      },
      error: (err) => {
        console.error('Error al cargar generos en el home', err);
      }
    });
  }

}