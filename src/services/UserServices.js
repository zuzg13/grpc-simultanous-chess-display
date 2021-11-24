import { Empty, User, UserId} from "../protos/game_pb";
import { UserServiceClient } from "../protos/game_grpc_web_pb";

const client = new UserServiceClient("http://localhost:8080", null, null);


export async function getAllUsers() {

    try{
        const response = await fetch('/getUsers');
        return await response.json();
    }catch(error) {
        return [];
    }

}

export async function createUser(data) {

    const user = new User();
    user.setId(0);
    user.setName(data.name);

    client.addNewUser(user, null, (err, data)=>{
        return data.getId();
    });

    // const response = await fetch('/newUser', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({data: data})
    // }) ;
    // return await response.json();
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