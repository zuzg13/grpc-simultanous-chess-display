const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./protos/game.proto";
const protoLoader = require("@grpc/proto-loader");
const _ = require('lodash');
const {Chess} = require('chess.js')

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const systemProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();


let users = [];

let games = [];




let gameCourses = []
;


server.addService(systemProto.GameService.service, {

    getAllUsers: (call, callback) => {
        callback(null, {users})
    },
    addNewUser: (call, callback)=>{
        console.log('---addNewUser request---');
        console.log('request data:');
        console.log(call.request);

        let newid = users[users.length-1].id + 1;
        let _user = { id: newid, name: call.request.name};
        users.push(_user);

        console.log('callback data:');
        console.log({id: newid});

        callback(null, {id: newid});
    },
    removeUser: (call, callback)=>{
        console.log('---removeUser request---');
        console.log('request data:');
        console.log(call.request);
        const userId = call.request.id;
        users = users.filter(({ id }) => id !== userId);
        callback(null, {});
    },

    getAllGames: (call, callback) => {
        console.log('---getAllGames request---');
        console.log('callback data:');
        console.log(games);
        callback(null, {gameInfos: games});
    },
    addNewGame:(call, callback) => {
        console.log('---addNewGame request---');
        console.log(call.request);
        try{
            let newgameid = games[games.length-1].id + 1;
            let _game = {
                id: newgameid,
                owner: {
                    id: parseInt(call.request.owner.id, 10),
                    name: users.filter(el => el.id === parseInt(call.request.owner.id, 10))[0].name
                },
                capacity: parseInt(call.request.capacity),
                usersid: [parseInt(call.request.owner.id, 10)],
                time: call.request.time
            };
            games.push(_game);

            gameCourses.push({gameId: newgameid, readyUsers: [], currentGameId: 0, gameReady: false, boards:[]})
            console.log('callback data:');
            console.log(_game);
            callback(null, {game: _game});
        }catch(e){
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception during handling request",
            });
        }

    },
    addUserToGame:(call, callback) => {
        try{
            console.log('---addUserToGame request---')
            console.log('request data:')
            console.log(call.request);

            const game_info = games.filter(el => el.id === parseInt(call.request.gameid, 10));

            if(game_info[0].usersid.length === game_info[0].capacity){
                callback({
                    code: grpc.status.FAILED_PRECONDITION,
                    message: "Game's players list is full",
                }, {result: false});
            }
            else{
                let game_map = games.map(x=>x.id);
                let index = game_map.indexOf(parseInt(call.request.gameid, 10));

                console.log(games[index].usersid.indexOf(call.request.userid));

                if(games[index].usersid.indexOf(call.request.userid) !== -1)
                    callback({
                        code: grpc.status.INVALID_ARGUMENT,
                        message: "User is already in this game course",
                    }, {result: false});

                games[index].usersid.push(parseInt(call.request.userid, 10));
                console.log('callback data:');
                console.log({result: true});
                callback(null, {result: true});
            }
        }catch (e){
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception during handling request",
            });
        }
    },
    closeGame:(call, callback)=>{
        const gameId = call.request.id;
        games = games.filter(({ id }) => id !== gameId);
        callback(null, {});
    },

    getUsersGames:(call, callback)=>{
        console.log('---getUsersGames request---')
        console.log('request data:')
        console.log(call.request);
        let user_id;
        try{
            user_id = parseInt(call.request.id, 10);
        }
        catch (e) {
            console.log(e);
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "Error during reading data from request",
            });
        }
        try{
            const games_filtered = games.filter(el => el.usersid.indexOf(user_id) !== -1);
            console.log('callback data:');
            console.log(games_filtered);
            callback(null, {gameInfos: games_filtered});
        }catch (e) {
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Error during filtering games list to find user's games",
            });
        }
    },

    startGame: (call, callback) => {
        try{
            console.log('---startGame request---')
            console.log('request data:')
            console.log(call.request);
            const game_id = parseInt(call.request.gameId, 10);
            const user_id = parseInt(call.request.userId, 10);
            // console.log(gameCourses);

            let game_map = games.map(x=>x.id);
            let tmp = game_map.indexOf(game_id);
            const capacity = games[tmp].capacity;
            const players = games[tmp].usersid;

            game_map = gameCourses.map(x=>x.gameId);
            let index = game_map.indexOf(parseInt(call.request.gameId, 10));

            if(gameCourses[index].readyUsers.indexOf(user_id) !== -1)
                callback(null, {}); /// TODO: obsługa blędow
            if(gameCourses[index].readyUsers.length === capacity)
                callback(null, {})

            gameCourses[index].readyUsers.push(user_id);

            // when all of the users are ready to play server initializes game and its data
            if(gameCourses[index].readyUsers.length === capacity){
                gameCourses[index].gameReady = true;
                gameCourses[index].currentGameId = 1;

                let boards = [];
                for(let i = 0; i<capacity-1; i++){
                    boards.push({
                        gameId: game_id,
                        subGameId: i+1,
                        simulUserId: players[0],
                        otherUserId: players[i+1],
                        board_FEN: new Chess().fen(),
                        currentColor: 'white',
                        gameOver: false,
                        winnerName: ""
                    });
                }

                gameCourses[index].boards = boards;
                console.log(gameCourses[index]);
            }

        }catch (e){
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }

        callback(null, {});

    },
    getGameCourseInfo: (call, callback) => {
        try{
            console.log('---getGameCourseInfo request---')
            console.log('request data:')
            console.log(call.request);
            const gameId = parseInt(call.request.id, 10);
            const gameCourseFiltered = gameCourses.filter(el => el.gameId === gameId);
            console.log('callback data:');
            console.log(gameCourseFiltered[0]);
            callback(null, gameCourseFiltered[0]);
        }catch (e) {
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }
    },
    doMove: (call, callback) => {

        console.log('---doMove request---')
        console.log('request data:')
        console.log(call.request);

        try{
            const gameId = parseInt(call.request.gameId, 10);
            const subgGameId = parseInt(call.request.subGameId, 10);
            let gameMap = gameCourses.map(el=> el.gameId);
            let indexGame = gameMap.indexOf(gameId);
            gameCourses[indexGame].boards.forEach((board, index)=>{
                if(board.subGameId === subgGameId){
                    gameCourses[indexGame]
                        .boards[index]
                        .board_FEN = call.request.updatedBoardFEN;
                    if(gameCourses[indexGame]
                        .boards[index]
                        .currentColor === 'white')
                        gameCourses[indexGame]
                            .boards[index]
                            .currentColor = 'black';
                    else
                        gameCourses[indexGame]
                            .boards[index]
                            .currentColor = 'white';

                    console.log('callback info:');
                    console.log(board);
                    callback(null, board);
                }
            });
        }catch(e){
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }
        callback(null, {});

    },
    getBoardInfo: (call, callback) => {
        try{
            console.log('\n\n---getBoardInfo request---')
            console.log('request data:')
            console.log(call.request);

            const gameId = parseInt(call.request.gameId, 10);
            const subGameId = parseInt(call.request.subGameId, 10);
            if(subGameId === 0 || gameId === 0 ){
                console.log({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: 'gameId or subGameId equal to 0'
                });
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: 'gameId or subGameId equal to 0'
                })
            }
            else{
                console.log(gameCourses);
                const gameCourseFiltered = gameCourses.filter(el => el.gameId === gameId);
                console.log(gameCourseFiltered);
                const board = (gameCourseFiltered[0].boards)
                    .filter(el=> el.subGameId === subGameId);
                console.log('callback data: ');
                console.log(board);

                callback(null, board[0]);
            }

        }catch (e) {
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }

    },
    goNext: (call, callback) => {
        console.log('\n\n---goNext request---')
        console.log('request data:')
        console.log(call.request);

        gameCourses.forEach(game => {
            if(game.gameId === parseInt(call.request.id, 10)){
                if(game.currentGameId >= game.readyUsers.length-1)
                    game.currentGameId = 1;
                else
                    game.currentGameId++;

                console.log('current gameid:');
                console.log(game);
                callback(null, game);
            }
        });
    },
    getSubGameId: (call, callback) =>{
        console.log('\n\n---getSubGameId request---')
        console.log('request data:')
        console.log(call.request);

        try{
            const gameId = parseInt(call.request.gameId, 10);
            const otherUserId = parseInt(call.request.otherUserId, 10);
            const gameCourseFiltered = gameCourses.filter(el => el.gameId === gameId);

            if(otherUserId === gameCourseFiltered[0].boards[0].simulUserId){
                console.log('ERROR:', {
                    code: grpc.status.INVALID_ARGUMENT,
                    message: "OtherUserId is id of Simultanous Player",
                });
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: "OtherUserId is id of Simultanous Player",
                });
            }else{
                const subGameId = gameCourseFiltered[0]
                    .boards.filter(el=>el.otherUserId === otherUserId)[0]
                    .subGameId;

                console.log('callback data:');
                console.log({
                    id: subGameId
                });

                callback(null,{
                    id: subGameId
                });
            }
        }catch (e){
            console.log(e);
        }

    },
    endSubGame: (call, callback) => {
        console.log('\n\n---endSubGame request---')
        console.log('request data:')
        console.log(call.request);

        try{
            const gameId = parseInt(call.request.gameId, 10);
            const subGameId = parseInt(call.request.subGameId, 10);
            const winnerId = parseInt(call.request.winnerId, 10);
            const winnerName = users.filter(el => el.id === winnerId)[0].name;
            const gameCourseFiltered = gameCourses.filter(el => el.gameId === gameId);

            gameCourseFiltered[0]
                .boards.filter(el=>el.subGameId === subGameId)[0].gameOver = true;
            gameCourseFiltered[0]
                .boards.filter(el=>el.subGameId === subGameId)[0].winnerName = winnerName;

            callback(null, {});
        }catch (e) {
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }
    },
    areAllGameCourseOver: (call, callback)=>{
        console.log('\n\n---areAllGameCourseOver request---')
        console.log('request data:')
        console.log(call.request);

        try{
            const gameId = parseInt(call.request.gameId, 10);
            const gameCourseFiltered = gameCourses.filter(el => el.gameId === gameId);
            let tmp_counter = 0;
            let numberOfCourses = gameCourseFiltered[0].boards.length;
            gameCourseFiltered[0].boards.forEach(board =>{
                if(board.gameOver)
                    tmp_counter++;
            });
            if(numberOfCourses === tmp_counter)
                callback(null, {result: true});
            else
                callback(null, {result: false});


        }catch (e) {
            console.log(e);
            callback({
                code: grpc.status.UNKNOWN,
                message: "Exception while processing data",
            })
        }
    }

})



server.bindAsync(
    "0.0.0.0:9090",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server at port:", port);
        console.log("Server running at http://0.0.0.0:9090");
        server.start();
    }
);