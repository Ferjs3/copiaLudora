import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Auth } from '../models/auth';

@Service()
export class AuthService {

    private readonly url = '/api/auth'
    private http = inject(HttpClient)


    login(auth : Auth){
        return this.http.post<string>(`${this.url}/login`, auth)
    }
}
