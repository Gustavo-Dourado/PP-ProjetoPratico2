let page = 'https://swapi.dev/api/films/'

 window.onload = async () => {
     try {
         await loadFilms(page);

     } catch (error) {
         alert('Erro ao carregar os cards')
     }
};

async function loadFilms(page){
    const mainContents = document.getElementById('main-content');

    try {
        const responses = await fetch(page);
        const responsesJson = await responses.json();
        
        responsesJson.results.forEach((film) => {

            const cards = document.createElement("div")
            cards.className = "cards"
            cards.style.backgroundImage = `url(./films/star_wars_film_${film.url.replace(/\D/g, "")}.jpg)`

            const containerFilm = document.createElement("div")
            containerFilm.className = "container-film"

            const textFilm = document.createElement("span")
            textFilm.className = "text-film"
            textFilm.innerText = `${tituloPortugues(film.title)}`

            cards.appendChild(containerFilm)
            containerFilm.appendChild(textFilm)
            mainContents.appendChild(cards)

            cards.onclick = () => {

                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ""

                const modalImage = document.createElement("div")
                modalImage.className = 'modal-image'
                modalImage.style.backgroundImage = `url(./films/star_wars_film_${film.url.replace(/\D/g, "")}.jpg)`
                modalContent.appendChild(modalImage)

                const titleFilm = document.createElement("span")
                titleFilm.className = 'description'
                titleFilm.innerText = `Nome: ${tituloPortugues(film.title)}`
                modalContent.appendChild(titleFilm)

                const episode = document.createElement("span")
                episode.className = 'description'
                episode.innerText = `Episodio: ${film.episode_id}`
                modalContent.appendChild(episode)

                const director = document.createElement("span")
                director.className = 'description'
                director.innerText = `Diretor: ${film.director}`
                modalContent.appendChild(director)

                const dataFilm = document.createElement("span")
                dataFilm.className ='description'
                dataFilm.innerText = `Lancamento: ${dataLancamento(film.release_date)}`
                modalContent.appendChild(dataFilm)
            }
        });

    } catch (error){
        console.log(error);
        alert('Erro ao carregar os filmes');
    }
};

modal.onclick =() =>{
    const modal = document.getElementById('modal')
                modal.style.visibility='hidden'

}

function tituloPortugues(titulo){

    const titleOriginal = titulo.toLowerCase();

    const tituloENG = 
    ['a new hope',
    'the empire strikes back',
    'return of the jedi',
    'the phantom menace',
    'attack of the clones',
    'revenge of the sith'];  
    
    const tituloPT = 
    ['Uma nova esperanca',
    'O imperio contra-ataca',
    'O retorno de Jedi',
    'A ameaca Fantasma',
    'Ataque dos clones',
    'A vinganca dos Sith'];
    
    const posicao = tituloENG.indexOf(titleOriginal);

    return tituloPT[posicao];
}

function dataLancamento(lancamento){
    const ano = lancamento.substring(0, 4);
    const mes = lancamento.substring(5, 7);
    const dia = lancamento.substring(8, 10);

    return `${dia}-${mes}-${ano}`

}

