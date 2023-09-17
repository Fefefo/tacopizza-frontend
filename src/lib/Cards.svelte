<script lang="ts">
  import { onMount } from "svelte";
  import spinner from "svelte-awesome/icons/spinner";
  import Icon from "svelte-awesome";

  export let imgArray: string[] = [];
  export let imgCurr = 5;

  let loadedImages = 0;
  $: loaded = loadedImages === imgArray.length;
  $: src = imgArray[imgCurr];

  onMount(() => {
    imgArray.forEach((imageSrc) => {
      const image = new Image();
      image.onload = () => {
        loadedImages++;
      };
      image.src = imageSrc;
    });
  });
</script>

{#if loaded}
  <img {src} alt="Carta giocata" class="border-2 border-gray-300 img-size" />
{:else}
  <!--    <img class="border-2 border-gray-300 img-size" src="../../../loading.svg" alt="loading">-->
  <div class="img-size flex flex-col items-center justify-center">
    <Icon data={spinner} pulse scale={5} style="fill:#9921e8" />
  </div>
{/if}

<style>
  .img-size {
    width: 240px;
    height: 320px;
  }
</style>
