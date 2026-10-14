import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Client } from '../models/client';
import { ClientRequest } from '../models/client-request';

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

    addUser(clientRequest : ClientRequest){
        return this.http.post<ClientRequest>(this.url,clientRequest)
    }
}
