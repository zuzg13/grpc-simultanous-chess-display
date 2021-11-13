export async function getAllGames() {

    try{
        const response = await fetch('/gamesInfo/');
        return await response.json();
    }catch(error) {
        return [];
    }

}

export async function createGame(data) {
    const response = await fetch('/gamesInfo/newGame', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    }) ;
    return await response.json();
}