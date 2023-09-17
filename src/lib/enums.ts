export enum EEvent {
  playerJoinedEvent,
  playerLeavedEvent,
  gameStartEvent,
  gameStartedEvent,
  playerTurnEvent,
  playCardEvent,
  cardPlayedEvent,
  handSmashEvent,
  getCardsEvent,
  reshuffleCardsEvent,
  playerWinEvent,
  playerList,
}

export enum EPhase {
  lobby,
  playCard,
  myTurn,
  smash,
  end,
}
