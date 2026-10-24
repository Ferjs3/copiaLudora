import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../services/game-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeRangeService } from '../../services/age-range-service';
import { GenreService } from '../../services/genre-service';
import { AgeRange } from '../../models/age-range';
import { Genre } from '../../models/genre';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form-game',
  styleUrl: './form-game.css',
  templateUrl: './form-game.html',
})
export class FormGame {

  gameService = inject(GameService)
  fb = inject(FormBuilder)
  form! : FormGroup
  route = inject(ActivatedRoute)
  router = inject(Router)

  today = new Date().toLocaleDateString('en-CA')
  ageRangeService = inject(AgeRangeService)
  genreService = inject(GenreService)

  ageRanges = signal<AgeRange[]>([])
  genres = signal<Genre[]>([])


  constructor(){
    this.loadAgeRange()
    this.loadGenres()
    this.loadForm()
  }

  loadForm(){
    this.form = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      frontPage: [''],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: ['', Validators.maxLength(200)],
      releaseDate: ['', Validators.required],
      ageRangeExternalId: ['', Validators.required],
      genreNames: this.fb.control<string[]>([], Validators.required)
    })
  }

  loadAgeRange(){
    this.ageRangeService.getAgeRanges().subscribe({
      next: data => this.ageRanges.set([...data].sort((a, b) => a.minAge - b.minAge)),
      error: e => console.error('Error al cargar AgeRanges:', e)
    })
  }

  loadGenres(){
    this.genreService.getGenres().subscribe({
      next: data => this.genres.set([...data].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))),
      error: e => console.error('error al cargar los Genres.. ', e)
    })
  }

  onGenreChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    const control = this.form.get('genreNames')!;
    const selectedGenres: string[] = control.value ?? [];

    if (checkbox.checked) {
      control.setValue([
        ...selectedGenres,
        checkbox.value
      ]);
    } else {
      control.setValue(
        selectedGenres.filter(name => name !== checkbox.value)
      );
    }

    control.markAsTouched();
  }

  onSubmit(){
    
  }
}
