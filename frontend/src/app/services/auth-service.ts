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

    getToken(){
        return localStorage.getItem('token')
    }

    private getPayload() : any | null{
        const token = this.getToken()

        if(!token) return null

        try {
            return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        } catch {
            return null;
        }
    }

    isLoggedIn(): boolean {
        const payload = this.getPayload();
        return !!payload && payload.exp * 1000 > Date.now();
    }

    getRoles(): string[] {
        return this.getPayload()?.roles ?? [];
    }

    hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }

    logout(){
        localStorage.removeItem('token')
    }
}
