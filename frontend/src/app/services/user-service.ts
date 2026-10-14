import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Client } from '../models/client';

@Service()
export class UserService {

    private readonly url = ''
    http = inject(HttpClient)

    getAllUsers(){
        return this.http.get<Client[]>(this.url)
    }

    getMyUser(){
        return this.http.get<Client>(this.url)
    }
}
