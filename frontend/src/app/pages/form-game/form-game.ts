import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form-game',
  styleUrl: './form-game.css',
  templateUrl: './form-game.html',
})
export class FormGame implements OnInit{

  gameService = inject(GameService)
  fb = inject(FormBuilder)
  form! : FormGroup
  route = inject(ActivatedRoute)
  router = inject(Router)


  ngOnInit(): void {
    this.loadForm()
  }

  loadForm(){
    this.form = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      frontPage: [''],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descripcion: ['', Validators.maxLength(200)],
      releaseDate: ['', Validators.required],
      ageRangeExternalId: ['', Validators.required],
      genreNames: [[], Validators.required]
    })
  }

  onSubmit(){
    
  }
}
