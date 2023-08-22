import React, { useState,useContext } from "react";
import { useParams } from 'react-router-dom'
import { client } from "../App";
import AuthContext from "../conctions/AuthContext";
function RoomSelector({ onSelectRoom }) {

  const {numAnn, idArtisan} = useParams();
  let {user} = useContext(AuthContext)
  
 


  const [selectedRoom, setSelectedRoom] = useState("");

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleJoinRoom = () => {
    if (selectedRoom) {
      onSelectRoom(selectedRoom);
    }
  };

  return (
    <div className="room-selector">
      <input
        type="text"
        placeholder="Enter room name"
        value={selectedRoom}
        onChange={handleRoomChange}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}

export default RoomSelector;
