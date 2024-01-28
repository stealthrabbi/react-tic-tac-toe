import { useState } from "react"
export default function Player({ initialName, symbol, isActive }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditSaveClick() {
        // pass a function, so it's scheduled
        setIsEditing(editing => !editing);
        // save the player name
        if (!isEditing) {
        }
    }

    function userNameTextChanged(event) {
        setPlayerName(event.target.value);
    }

    return <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {isEditing && <span><input required type="text" value={playerName} placeholder="Set Player Name" onChange={userNameTextChanged}></input></span>}
            {!isEditing && <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditSaveClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>


}