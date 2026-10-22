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

    getMyUserId(id : string){
        return this.http.get<ClientRequest>(`${this.url}/${id}`)
    }
    addUser(clientRequest : ClientRequest){
        return this.http.post<ClientRequest>(this.url,clientRequest)
    }

    putUser(clienteRequest : ClientRequest){
        return this.http.put<ClientRequest>(`${this.url}/${clienteRequest.externalId}`,clienteRequest)
    }


}
