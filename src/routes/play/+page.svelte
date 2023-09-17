<script lang="ts">
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  import { webSocketURL } from "$lib/constants";
  import { EEvent, EPhase } from "$lib/enums";
  import Cards from "$lib/Cards.svelte";

  const mascyes = ["Taco", "Gatto", "Capra", "Cacio", "Pizza"];
  const mascyes_img = [
    "/images/taco.webp",
    "/images/cat.webp",
    "/images/goat.webp",
    "/images/cheese.webp",
    "/images/pizza.webp",
    "/images/none.webp",
  ];

  interface Message {
    messageType: number;
    info: any;
  }

  class Player {
    name: string;
    remainingCard: string;
    constructor(name: string) {
      this.name = name;
      this.remainingCard = "?";
    }
  }

  let started = false;
  let winner = "";
  let phase = EPhase.lobby;
  let smashable = false;
  let startTime = 0;
  let players: Player[] = [];
  let currentPlayer: string;
  let gameEventsLogger: string[] = [];
  let titleCard = "Giocate la prima carta!";
  let imgCurr = 5;

  let myName = "",
    lobbyID = "";
  let socket: WebSocket;

  if (browser) {
    if (
      window.sessionStorage.getItem("lobby") &&
      window.sessionStorage.getItem("name")
    ) {
      myName = window.sessionStorage.getItem("name")!;
      lobbyID = window.sessionStorage.getItem("lobby")!;
    } else {
      goto("/");
    }
    const socketRequest =
      webSocketURL +
      // new URLSearchParams({ lobbyID: $lobbyID, playerName: $myName }).toString();
      new URLSearchParams({
        lobbyID: lobbyID,
        playerName: myName,
      }).toString();

    socket = new WebSocket(socketRequest);

    socket.addEventListener("close", () => {
      if (winner == "") {
        goto("/lobby");
      }
    });

    socket.addEventListener("message", (event) => {
      const message: Message = JSON.parse(event.data);
      switch (message.messageType) {
        case EEvent.playerList:
          for (const el of message.info) {
            players = [...players, new Player(el)];
          }
          break;
        case EEvent.playerJoinedEvent:
          // players.push(message.info);
          players = [...players, new Player(message.info)];
          break;

        case EEvent.playerLeavedEvent:
          players = players.filter((player) => player.name !== message.info);
          break;

        case EEvent.gameStartedEvent:
          started = true;
          phase = EPhase.smash;
          break;

        case EEvent.playerTurnEvent:
          smashable = false;
          currentPlayer = message.info;
          if (message.info == myName) {
            phase = EPhase.myTurn;
          } else {
            phase = EPhase.playCard;
          }
          break;

        case EEvent.cardPlayedEvent:
          phase = EPhase.smash;
          startTime = performance.now();
          smashable = true;
          titleCard = mascyes[message.info["currentMascy"]];
          imgCurr = message.info["card"];
          const index = players.findIndex(
            (player) => player.name == currentPlayer
          );
          const num = message.info["num"] ?? "?";
          if (num != "?") {
            players[index].remainingCard = num;
          }
          break;

        case EEvent.getCardsEvent:
          for (const p of message.info) {
            const index = players.findIndex((player) => player.name === p);
            players[index].remainingCard = "?";
          }
          gameEventsLogger = [
            `${message.info.join(", ")} ${
              message.info.length == 1 ? "ha" : "hanno"
            } preso le carte!`,
            ...gameEventsLogger,
          ];
          break;

        case EEvent.playerWinEvent:
          socket.close();
          phase = EPhase.end;
          winner = message.info;
          gameEventsLogger = [`${winner} ha vinto!`, ...gameEventsLogger];
      }
      console.log(message);
    });
  }

  function start() {
    let msg = { messageType: EEvent.gameStartEvent, info: "" };
    socket.send(JSON.stringify(msg));
  }

  function playCard() {
    let msg = { messageType: EEvent.playCardEvent, info: "" };
    socket.send(JSON.stringify(msg));
  }

  function smash() {
    smashable = false;
    let elapsed = performance.now() - startTime;
    let msg = {
      messageType: EEvent.handSmashEvent,
      info: elapsed,
    };
    socket.send(JSON.stringify(msg));
  }

  function backToLobby() {
    window.sessionStorage.removeItem("lobby");
    goto("/lobby");
  }

  function checkKey(e: KeyboardEvent) {
    if ((e.key === " " || e.key === "Spacebar") && phase === EPhase.smash) {
      smash();
    } else if (e.key === "c" && phase === EPhase.myTurn) {
      playCard();
    }
  }
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <title>Gioco di carte</title>
</svelte:head>

<div
  class="body-bg body min-h-screen pt-10 md:pt-15 pb-6 px-2 md:px-0 select-none overflow-hidden"
>
  <header class="max-w-lg mx-auto">
    <h1 class="text-4xl font-bold text-white text-center">
      {myName}
      {started && winner == ""
        ? "sei in partita!"
        : winner == ""
        ? "sei nella lobby!"
        : "la partita è finita!"}
    </h1>
  </header>
  <main
    class="bg-white mx-auto max-w-lg p-8 md:p-10 my-10 rounded-lg shadow-2xl"
  >
    {#if started && winner == ""}
      <section>
        <h3 class="font-bold text-2xl text-center">{titleCard}</h3>
      </section>
      <section class="flex justify-center">
        <Cards imgArray={mascyes_img} {imgCurr} />
      </section>
      <section class="flex flex-col mt-5">
        {#if phase === EPhase.myTurn}
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
            on:click={playCard}
            on:keydown={checkKey}
            >Gioca carta
          </button>
        {:else}
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
            on:click={smash}
            on:keydown={checkKey}
            disabled={!smashable}
            >SMASH
          </button>
        {/if}
      </section>
      <section class="rounded bg-gray-200 flex flex-row flex-wrap my-5">
        {#each players as player}
          <div
            class="rounded border-2 {currentPlayer === player.name
              ? 'border-red-600'
              : 'border-gray-300'} {player.name === myName
              ? 'my-player-bg'
              : 'player-bg'} m-2 p-2 text-white"
          >
            {player.name} <span class="text-black">{player.remainingCard}</span>
          </div>
        {/each}
      </section>
      <section>
        {#each gameEventsLogger as gameEvent}
          <h3
            class="font-bold text-base text-gray-500 first:text-xl first:text-black"
          >
            {gameEvent}
          </h3>
        {/each}
      </section>
    {:else if !started}
      <section>
        <h3 class="font-bold text-2xl">Lobby ID</h3>
      </section>
      <section class="rounded bg-gray-200 mx-auto my-auto mt-5">
        <h2 class="text-center text-xl select-text">{lobbyID}</h2>
      </section>
      <section class="mt-10">
        <h3 class="font-bold text-2xl">Players</h3>
      </section>
      <section class="rounded bg-gray-200 flex flex-row flex-wrap mt-5">
        {#each players as player}
          <div
            class="rounded border-2 border-gray-300 {player.name === myName
              ? 'my-player-bg'
              : 'player-bg'} m-2 p-2 text-white"
          >
            {player.name}
          </div>
        {/each}
      </section>
      <section class="flex flex-col mt-5">
        <button
          on:click={start}
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
          >Start
        </button>
      </section>
    {:else}
      <section>
        <h3 class="font-bold text-2xl text-center">
          {winner === myName ? "Hai vinto!" : `${winner} ha vinto!`}
        </h3>
      </section>
      <section class="mt-10">
        <h3 class="font-bold text-2xl">Players</h3>
      </section>
      <section class="rounded bg-gray-200 flex flex-row flex-wrap mt-5">
        {#each players as player}
          <div
            class="rounded border-2 border-gray-300 {player.name === myName
              ? 'my-player-bg'
              : 'player-bg'} m-2 p-2 text-white"
          >
            {player.name}
            {player.name == winner ? "🏆" : ""}
          </div>
        {/each}
      </section>
      <section class="flex flex-col mt-5">
        <button
          on:click={backToLobby}
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
          >Torna alla lobby
        </button>
      </section>
    {/if}
  </main>
</div>

<!--suppress CssUnusedSymbol -->
<style>
  .body-bg {
    background-color: #9921e8;
    background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
  }

  .player-bg {
    background-color: #5f72be;
  }

  .my-player-bg {
    background-color: darkorange;
  }
</style>
