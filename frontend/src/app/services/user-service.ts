import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Client } from '../models/client';
import { ClientRequest } from '../models/client-request';
import { ClientResponse } from '../models/client-response';
import { Developer, Page } from '../models/developer';

@Service()
export class UserService {

    private readonly baseUrl = 'http://localhost:8080/api'
    private readonly url = ''   // pendiente: getMyUser / addUser
    http = inject(HttpClient)

    getClients(page: number, size: number) {
        return this.http.get<Page<ClientResponse>>(`${this.baseUrl}/clients`, { params: { page, size } })
    }

    getDevelopers(page: number, size: number) {
        return this.http.get<Page<Developer>>(`${this.baseUrl}/developers`, { params: { page, size } })
    }

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