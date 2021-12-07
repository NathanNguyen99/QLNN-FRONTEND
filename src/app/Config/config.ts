import { Injectable } from '@angular/core';
@Injectable()
export class AppConfig {
    private _config: { [key: string]: string };
    constructor() {
        this._config = { 
            //PathAPI: 'http://118.69.60.194:54399/api/'
            PathAPI: 'https://localhost:44337/api/'
        };
    }
    get setting():{ [key: string]: string } {
        return this._config;
    }
    get(key: any) {
        return this._config[key];
    }
};