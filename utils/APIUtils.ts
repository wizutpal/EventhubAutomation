import { APIRequestContext, expect } from '@playwright/test';

export interface LoginData {
  email: string;
  password: string;
}

export class APIUtils {
  private apiContext: APIRequestContext;
  private loginPayLoad: LoginData;

    constructor(apiContext: any, loginPayLoad: LoginData)
    {
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken()
    {
        
        const loginResponse= await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: this.loginPayLoad
        })
            //ok tracks all 2XX series status codes
        const jsonResponse= await loginResponse.json();
        const token= jsonResponse.token;
        console.log(token);
        return token;
    }
}