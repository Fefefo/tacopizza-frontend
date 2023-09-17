<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import { checkLobbyURL, createLobbyURL } from "$lib/constants";

  let inpID: HTMLInputElement;
  let joinLobbyError = "";
  let myName = "";

  onMount(() => {
    if (!window.sessionStorage.getItem("name")) {
      goto("/");
    }
    myName = window.sessionStorage.getItem("name") ?? "";
  });

  function createLobby() {
    fetch(createLobbyURL, { method: "POST" })
      .then((response) => response.text())
      .then((responseData) => {
        window.sessionStorage.setItem("lobby", responseData);
        goto("/play");
      });
  }

  function joinLobby(event: SubmitEvent) {
    //event: KeyboardEvent) {
    // if (event.key !== "Enter") return;

    event.preventDefault();
    fetch(
      checkLobbyURL +
        new URLSearchParams({
          lobbyID: inpID.value,
          playerName: myName,
        }),
      { method: "GET" }
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.statusText);
        }
        return response.text();
      })
      .then((responseData) => {
        if (responseData == "1") {
          window.sessionStorage.setItem("lobby", inpID.value);
          goto("/play");
        } else {
          joinLobbyError = responseData;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<svelte:head />
<div
  class="body-bg min-h-screen pt-10 md:pt-15 pb-6 px-2 md:px-0 select-none overflow-hidden"
>
  <header class="max-w-lg mx-auto">
    <h1 class="text-4xl font-bold text-white text-center">
      Benvenuto {myName} su TacoPizza
    </h1>
  </header>
  <main
    class="bg-white mx-auto max-w-lg p-8 md:p-10 my-10 rounded-lg shadow-2xl"
  >
    <section>
      <h3 class="font-bold text-2xl">Inserisci l'ID della lobby</h3>
    </section>
    <section class="mt-10">
      <form class="flex flex-col" on:submit={joinLobby}>
        <div class="mb-0 pt-3 rounded bg-gray-200">
          <label
            for="lobby-id"
            class="block text-gray-700 text-sm mb-2 ml-3 font-bold"
            >ID Lobby</label
          >
          <input
            type="text"
            autocomplete="off"
            id="lobby-id"
            bind:this={inpID}
            class="bg-gray-200 w-full text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition:duration-500 pb-3 px-3"
          />
        </div>
        <span
          class="font-bold text-red-600"
          style="display: {joinLobbyError ? 'block' : 'none'}"
          >{joinLobbyError}</span
        >
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200 mt-5"
          >Entra
        </button>
      </form>
    </section>
    <section class="mt-10">
      <h3 class="font-bold text-2xl">Oppure creane una tu!</h3>
      <div class="flex flex-col mt-5">
        <button
          on:click={createLobby}
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
          >Crea lobby
        </button>
      </div>
    </section>
  </main>
  <div class="max-w-lg mx-auto text-center">
    <p class="text-white">
      Vuoi controllare le regole?
      <a href="/rules" class="font-bold hover:underline">Controllale qui</a>
    </p>
  </div>
</div>

<style>
  .body-bg {
    background-color: #9921e8;
    background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
  }
</style>
