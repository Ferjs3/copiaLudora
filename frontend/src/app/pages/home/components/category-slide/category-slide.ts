import { Component, input, output, ElementRef, ViewChild } from '@angular/core';
import { Genre } from '../../../../models/genre'; // Ajustá la ruta hacia tu modelo Genre
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-slide',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-slide.html',
  styleUrl: './category-slide.css',
})
export class CategorySlide {
  // recibe la lista de categorias desde el home
  genres = input.required<Genre[]>();

  readonly repetitions: number[] = [1, 2, 3, 4];

  // emite la categoría clickeada por si querés filtrar o navegar
  categorySelected = output<Genre>();

  @ViewChild('track', { static: false }) trackRef!: ElementRef<HTMLDivElement>;

  selectCategory(genre: Genre): void {
    this.categorySelected.emit(genre);
  }

  // desplazamiento horizontal con botones laterales
  scroll(direction: 'left' | 'right'): void {
    if (!this.trackRef) return;
    const scrollAmount = 300;
    const container = this.trackRef.nativeElement;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}