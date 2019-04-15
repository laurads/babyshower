import {API} from 'aws-amplify';

export function getGalleryImages(){
    
    //return API.get('DESCRIPTIONCRUD','/DESCRIPTION/COMPANIES_TEXT')
}

export function checkCredentials(login,password){
    let options ={
        "queryStringParameters": 
            {
                "password": password
            }
    }
    return API.get('Login', '/login', options);
}