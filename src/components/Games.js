import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


export const Games = ({games}) => {
    if (games.length === 0) return null

    const GamesRow = (game,index) => {

        return(
            <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td>{index+1}</td>
                <td>{game.id}</td>
                <td>{game.owner.name}</td>
                <td>{game.usersid.length}/{game.capacity}</td>
                <td><button type="button"   className="btn btn-outline-primary">Dołącz do gry</button></td>
            </tr>
        )
    };

    const gamesTable = games.map((game,index) => GamesRow(game,index));

    return(
        <div className="container">
            <h2>Gry</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Game Id</th>
                    <th>Owner name</th>
                    <th>Liczba miejsc</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {gamesTable}
                </tbody>
            </table>
        </div>
    );
}

