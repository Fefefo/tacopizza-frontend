<script lang="ts">
  import { goto } from "$app/navigation";

  let inpName: HTMLInputElement;

  function setName(event: SubmitEvent) {
    event.preventDefault();
    window.sessionStorage.setItem("name", inpName.value);
    goto("/lobby");
  }
</script>

<svelte:head>
  <title>Homepage</title>
</svelte:head>

<div
  class="body-bg body min-h-screen pt-10 md:pt-15 pb-6 px-2 md:px-0 select-none overflow-hidden"
>
  <header class="max-w-lg mx-auto">
    <h1 class="text-4xl font-bold text-white text-center">
      Benvenuto su TacoPizza
    </h1>
  </header>
  <main
    class="bg-white mx-auto max-w-lg p-8 md:p-10 my-10 rounded-lg shadow-2xl"
  >
    <section>
      <h3 class="font-bold text-2xl">Inserisci il tuo nickname</h3>
    </section>
    <section class="mt-10">
      <form class="flex flex-col" on:submit={setName}>
        <div class="mb-5 pt-3 rounded bg-gray-200">
          <label
            for="nickname"
            class="block text-gray-700 text-sm mb-2 ml-3 font-bold"
            >Nickname</label
          >
          <input
            type="text"
            autocomplete="off"
            maxlength="10"
            minlength="3"
            id="nickname"
            bind:this={inpName}
            class="bg-gray-200 w-full text-gray-700 rounded focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition:duration-500 pb-3 px-3"
          />
        </div>
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition:duration-200"
          >Entra
        </button>
      </form>
    </section>
  </main>
  <div class="max-w-lg mx-auto text-center mt-12 mb-5">
    <p class="text-white">
      Vuoi controllare le regole?
      <a href="/rules" class="font-bold hover:underline">Controllale qui</a>
    </p>
  </div>
</div>

<style>
  .body {
    font-family: "Lato", sans-serif;
  }

  .body-bg {
    background-color: #9921e8;
    background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
  }
</style>
