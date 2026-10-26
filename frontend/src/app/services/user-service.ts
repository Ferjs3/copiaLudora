import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Client } from '../models/client';
import { ClientRequest } from '../models/client-request';
import { ClientResponse } from '../models/client-response';
import { Developer, Page } from '../models/developer';

@Service()
export class UserService {

    private readonly url = '/api'
    http = inject(HttpClient)

    getClients(page: number, size: number) {
        return this.http.get<Page<ClientResponse>>(`${this.url}/clients`, { params: { page, size } })
    }

    getDevelopers(page: number, size: number) {
        return this.http.get<Page<Developer>>(`${this.url}/developers`, { params: { page, size } })
    }

    blockAccount(externalId: string) {
        return this.http.patch<void>(`${this.url}/admins/${externalId}/block`, null)
    }

    unblockAccount(externalId: string) {
        return this.http.patch<void>(`${this.url}/admins/${externalId}/unblock`, null)
    }

    
     //-------------------------------------------------------------------------------------------//
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