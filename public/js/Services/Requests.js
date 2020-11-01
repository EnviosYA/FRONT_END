export const post = (url, entity) => {
    return fetch(url, {
        method:"POST",
        mode: "cors",
        body: JSON.stringify(entity),
        headers: {
            'Content-Type': 'application/json'
        } 
    })
    .then(response => { 
        return response.json()
    })
    .then(json => {
        return json;
    })
    .catch(err => console.log('ERROR: ' + err))
}

export const get = (url) => {
    return fetch(url, {
        method:"GET"
    })
    .then(response => { 
        return response.json()
    })
    .then(json => {
        return json;
    })
    .catch(err => console.log('ERROR: ' + err))
}