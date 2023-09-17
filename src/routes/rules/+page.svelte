<svelte:head>
    <title>Regole del gioco</title>
</svelte:head>

<div class="body-bg body min-h-screen pt-10 md:pt-15 pb-6 px-2 md:px-0 select-none overflow-hidden">
    <header class="max-w-lg mx-auto">
        <h1 class="font-bold text-6xl text-white text-center">Regole del gioco</h1>
    </header>

    <main
            class="bg-white mx-auto max-w-xl p-8 md:p-10 my-10 rounded-lg shadow-2xl">
        <section class="mb-3">
            <h3 class="font-bold text-lg">Distribuzione delle carte</h3>
        </section>
        <section class="mb-2">
            <p>Il gioco è composto da 65 carte, 13 per ogni figura (5 figure).</p>
        </section>
        <section>
            <p>Il numero di carte distribuite dipende dal numero di giocatori:</p>
            <ul class="list-disc">
                <li>2-5 giocatori: 12 carte a testa</li>
                <li>6 giocatori: 10 carte a testa</li>
                <li>7 giocatori: 9 carte a testa</li>
                <li>8 giocatori: 8 carte a testa</li>
            </ul>
        </section>

        <section class="my-3">
            <h3 class="font-bold text-lg">Svolgimento</h3>
        </section>

        <p class="mb-1">
            Il gioco è a turni e ogni giocatore, quando è il suo turno, deve giocare una
            carta (scoprendola) al centro.
        </p>

        <p class="mb-1">
            Prima di ogni turno, ogni giocatore deve dire il nome di una figura. I nomi
            delle carte che vengono giocate devono essere detti in ordine, mentre le
            carte sono casuali.<br/>
            Se la figura nominata corrisponde a quella sulla carta giocata, tutti i giocatori
            devono premere il tasto "SMASH". L'ultimo a premere prende tutte le carte in
            tavola.
        </p>

        <p class="mb-1">
            Se un giocatore (o più giocatori) preme il tasto "SMASH" quando il nome non
            corrisponde prende tutte le carte in tavola.<br/>
            Se un giocatore (o più giocatori) non preme il tasto "SMASH" entro 2 secondi
            quando il nome corrisponde prende tutte le carte in tavola.<br/>
        </p>

        <p class="mb-1">
            Vince il giocatore che finisce per primo tutte le carte del proprio mazzo e
            dopo uno "SMASH" non prende le carte in tavola.
        </p>
    </main>
    <div class="max-w-lg mx-auto text-center">
        <p class="text-white">
            Hai imparato?
            <a href="/" class="font-bold hover:underline">Torna al gioco</a>
        </p>
    </div>
</div>

<style>
    .body-bg {
        background-color: #9921e8;
        background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
    }
</style>
