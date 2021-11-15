export async function getAllUsers() {

    try{
        const response = await fetch('/getUsers');
        return await response.json();
    }catch(error) {
        return [];
    }

}

export async function createUser(data) {
    const response = await fetch('/newUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    }) ;
    return await response.json();
}

export async function getLoggedUser(data){
    try{
        const response = await fetch('/users/getLoggedUser');
        return await response.json();
    }catch(error) {
        return [];
    }
}

export async function deleteUser(data){
    const response = await fetch('/users/'.concat(data.userid.toString()), {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    }) ;
    return await response.json();
}