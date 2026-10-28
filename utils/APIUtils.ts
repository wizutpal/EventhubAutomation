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

    async createEvent(eventPayLoad: object){
         let response={token: "", eventName: ""};
         response.token= await this.getToken();
         const eventResponse= await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/events",
                {
                    data: eventPayLoad,
                    headers: {
                                'Authorization': `Bearer ${response.token}`,
                                'content-type': 'application/json'
                            }
                }
            )
               const eventResponseJson= await eventResponse.json(); 
               console.log(eventResponseJson);
               
                let eventName: any
                eventName= await eventResponseJson.data.title;

               response.eventName= eventName;   
               return response;
    }
}


