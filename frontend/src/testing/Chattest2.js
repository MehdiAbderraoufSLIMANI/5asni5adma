import React, { useState, useEffect,useContext } from "react"; 
import { useParams } from 'react-router-dom'
import AuthContext from "../conctions/AuthContext";
import { client } from "../App";
function Chattest2() {
  const {numAnn, idArtisan} = useParams();
  let {user} = useContext(AuthContext)

 

  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

let create_room = async () => {
  const formData = new FormData();
  formData.append("annonce_id", numAnn);
  formData.append("artisan_id", idArtisan);
  formData.append("client_id", user.email);

  const controller = new AbortController();

  try {
    const response = await client.post('/apichat/room/', formData, { signal: controller.signal });
    console.log('Room has been created:', response.data);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('API request aborted:', error.message);
    } else {
      console.error('Room creation failed:', error);
      // Handle error as needed
    }
  }

  return controller.abort();
};
const [roomCreated, setRoomCreated] = useState(false);
useEffect(() => {
  if (!roomCreated) {
  let mounted = true;

  if (mounted) {
    create_room();
    setRoomCreated(true);
  }

  return () => {
    mounted = false;
  };}
}, [roomCreated]);

 


  useEffect(() => {
    // Get the username from local storage or prompt the user to enter it
    setUsername(user.email);
  
   
  
    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/`);
    setSocket(newSocket);
  
    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");
  
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);
  

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: username,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-username">{message.username}:</div>
            <div className="message-content">{message.message}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Chattest2;