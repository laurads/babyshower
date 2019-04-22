import {API} from 'aws-amplify';

export function getGalleryImages(){
    
    //return API.get('DESCRIPTIONCRUD','/DESCRIPTION/COMPANIES_TEXT')
}

export function checkCredentials(password){
    let options ={
        "queryStringParameters": 
            {
                "password": password
            }
    }
    return API.get('Login', '/login', options);
}

export function saveGuessDate(username, date){
    let requestParams = {
        headers: {'content-type': 'application/json'},
        body : {
            'username': username,
            'date': date
        }
    }
    return API.post('GuessDate','/date', requestParams)
}

export function saveNameRatings(username, names){
    let requestParams = {
        headers: {
            'content-type': 'application/json'
        },
        body : {
            'username': username,
            'nameRatings': names,
        }
    }
    return API.post('NameRating','/names', requestParams)
}

export function saveNameIdeas(username, others){
    let requestParams = {
        headers: {'content-type': 'application/json'},
        body : {
            'username': username,
            'name_idea': others
        }
    }
    return API.post('NameRating','/ideas', requestParams)
}

export function saveGuessWeight(username, weight){
    let requestParams = {
        headers: {'content-type': 'application/json'},
        body : {
            'username': username,
            'weight': weight
        }
    }
    return API.post('WeightGuess','/weight', requestParams)
}