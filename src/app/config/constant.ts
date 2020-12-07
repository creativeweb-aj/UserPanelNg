// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class Constants {
    constructor(
        // Angular Modules
        private http: HttpClient) { }
    public readonly API_URL: string = 'http://192.168.1.11:8000';
}