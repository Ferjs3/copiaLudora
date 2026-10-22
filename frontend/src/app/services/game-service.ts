import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game, PageResponse } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    private http : HttpClient = inject(HttpClient);
    private url = "http://localhost:8080/api/games";

    constructor(){}

    getGames(page: number = 0, size: number = 50): Observable<PageResponse<Game>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Game>>(this.url, { params });
  }
}
