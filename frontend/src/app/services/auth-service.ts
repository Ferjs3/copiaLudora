import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Auth } from '../models/auth';
import { AuthResponse } from '../models/auth-response';
import { map } from 'rxjs';

@Service()
export class AuthService {

    private readonly url = '/api/auth'
    private http = inject(HttpClient)


    login(auth : Auth){
        return this.http.post<AuthResponse>(`${this.url}/login`, auth).pipe(
            map(auth => localStorage.setItem('token', auth.token))
        )
    }
}
