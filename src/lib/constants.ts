const ip = "localhost";
const port = "6464";
const dns = "";
const secure = false;

const finalIP = `${dns ? dns : ip + ":" + port}`;
export const createLobbyURL = `http${
  secure ? "s" : ""
}://${finalIP}/createLobby`;
export const checkLobbyURL = `http${
  secure ? "s" : ""
}://${finalIP}/isJoinable?`;
export const webSocketURL = `ws${secure ? "s" : ""}://${finalIP}/joinLobby?`; //`ws://localhost:8080/joinLobby?lobbyID=${id}&playerName=${playerName}`;
