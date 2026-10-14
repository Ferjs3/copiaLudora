import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    private http : HttpClient = inject(HttpClient);
    private url = "http://localhost:3000/games";

    constructor(){}

    getGames(){
        return this.http.get<Game[]>(this.url);
    }
}
