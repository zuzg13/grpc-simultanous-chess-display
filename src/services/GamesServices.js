import { Empty, GameInfos } from "../protos/game_pb";
import { GamesServiceClient } from "../protos/game_grpc_web_pb";
const client = new GamesServiceClient("http://localhost:8080", null, null);




export async function getAllGames() {

    // try{
    //     const response = await fetch('/gamesInfo/');
    //     return await response.json();
    // }catch(error) {
    //     return [];
    // }
    let games = [];

    // client.getAllGames(new Empty(), null, (err, response) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         let gamesList = response?.getGameinfosList() || [];
    //         gamesList = gamesList.map( game => game.array);
    //
    //         for(let ind = 0; ind < gamesList.length; ind++) {
    //             console.log(gamesList[ind]);
    //             let tmp_array = gamesList[ind];
    //             gamesList[ind] = [];
    //             gamesList[ind].id = tmp_array[0];
    //             gamesList[ind].owner = [];
    //             gamesList[ind].owner.id = tmp_array[1][0];
    //             gamesList[ind].owner.name = tmp_array[1][1];
    //             gamesList[ind].capacity = tmp_array[2];
    //             gamesList[ind].usersid = tmp_array[3];
    //             gamesList[ind].time = tmp_array[4];
    //         }
    //     }
    //
    // });
}

export async function createGame(data) {
    const response = await fetch('/gamesInfo/newGame', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    }) ;
    return await response.json();
}

export async function addUserToGame(data){
    const response = await fetch('/gamesInfo/'.concat(data.gameid.toString()), {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data:data})
    });
    return await response.json();
}

export async function getUserGames(data){
    try{
        const response = await fetch('/gamesInfo/'.concat(data.userid.toString()));
        return await response.json();
    }catch(error) {
        return [];
    }
}