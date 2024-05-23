let currentPageUrl = "https://swapi.dev/api/planets/";

window.onload = async () =>{
    try{    
        await loadPlanets(currentPageUrl);
    } catch (error){
        alert('Erro ao carregar os cards')
        console.log(error)
    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)    
}

async function loadPlanets(url){

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ""; 
    
    try{
        const response = await fetch(url);
        const responseJson = await response.json();
        
        responseJson.results.forEach((planets) =>{

        const card = document.createElement("div")
        card.className = "cards"

        const cardFoto = document.createElement("div")
        cardFoto.className = "card-foto"

        const indicePlaneta = planets.url.replace(/\D/g, "")
         //Verificar o numero do id do planeta no url da api

        cardFoto.style.backgroundImage = verificaFoto(indicePlaneta);
        //funcao que verifica se há foto no endereco e retorna a url local ou a que existe a foto

        const cardName = document.createElement("div")
        cardName.className = "card-name"
        
        const planetName = document.createElement("span")
        planetName.className = "planet-name"
        planetName.innerText = `${planets.name}`
        
        card.appendChild(cardFoto)
        card.appendChild(cardName)
        cardName.appendChild(planetName)
        

        card.onclick = () => {
            
            const modal = document.getElementById('modal')
            modal.style.visibility='visible'

            const modalContent = document.getElementById('modal-content')
            modalContent.innerHTML = "" // Limpar antes de carregar novas informações

            const planetImage = document.createElement("div")
            planetImage.className ="planet-foto"
            planetImage.style.backgroundImage = verificaFoto(indicePlaneta);
            
            modalContent.appendChild(planetImage)

            const planeta = document.createElement("span")
            planeta.className = "planet-infos"
            planeta.innerText = `Nome: ${planets.name}`
            modalContent.appendChild(planeta)
            
            const diametro = document.createElement("span")
            diametro.className = "planet-infos"
            diametro.innerText = `Diametro ${formatarString(planets.diameter)} km`
            modalContent.appendChild(diametro)

            const climate = document.createElement("span")
            climate.className = "planet-infos"
            climate.innerText = `Clima: ${planets.climate}`
            modalContent.appendChild(climate)

            const terrain = document.createElement("span")
            terrain.className = "planet-infos"
            terrain.innerText = `Terreno: ${planets.terrain}`
            modalContent.appendChild(terrain)

            const population = document.createElement("span")
            population.className = "planet-infos"
            population.innerText = `Populacao: ${formatarString(planets.population)}`
            modalContent.appendChild(population)
        }
            mainContent.appendChild(card)

            const nextButton = document.getElementById('next-button')
            const backButton = document.getElementById('back-button')

            nextButton.disabled = !responseJson.next
            backButton.disabled = !responseJson.previous

            nextButton.style.visibility = responseJson.next? "visible" : "hidden"
            backButton.style.visibility = responseJson.previous? "visible" : "hidden"

            currentPageUrl = url
        });

    } catch (error){
        alert('Erro ao carregar os planetas')
        console.log(error)
    }
}

    function verificaFoto(indice){
    
        let endereco = ''
    
        if (indice == 1 || indice == 20) {
            endereco = `url('./assets/foto_nao_encontrada.jpg')`
        } else if (indice > 21) {
            endereco = `url('./assets/foto_nao_encontrada.jpg')`
        } else {
            endereco = `url('https://starwars-visualguide.com/assets/img/planets/${indice}.jpg')`
        }
        return endereco
    }

    modal.onclick = () =>{
        modal.style.visibility='hidden'
    }

    async function loadNextPage(){
        if(!currentPageUrl) return;
    
        try {
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()
    
            await loadPlanets(responseJson.next)
        } catch (error) { 
        console.log(error);
        alert('Erro ao carregar a próxima página')
        } 
    }
    
    async function loadPreviousPage(){
        if(!currentPageUrl) return;
    
        try {
            const response = await fetch(currentPageUrl)
            const responseJson = await response.json()
    
            await loadPlanets(responseJson.previous)
        } catch (error) { 
        console.log(error);
        alert('Erro ao carregar a página anterior')
        } 
    }

    function formatarString(stringAtual){
        const numero = Number.parseInt(stringAtual);
        return numero.toLocaleString('pt-BR');
    }
        


