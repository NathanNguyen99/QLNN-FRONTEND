import { Injectable } from '@angular/core';
//import {api_to_config, api_to_test} from '../../assets/config'
import { ConfigService } from '../Shared/Services/config.service';
@Injectable()
export class AppConfig {
    private _config: { [key: string]: string };
    constructor(
        configService: ConfigService) {
        this._config = { 
            //Test here
            PathAPI: 'https://localhost:44337/api/'
            //PathAPI: configService.config.apiUrl
        };
    }
    get setting():{ [key: string]: string } {
        return this._config;
    }
    get(key: any) {
        return this._config[key];
    }
};