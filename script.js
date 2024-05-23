let currentPageUrl ='https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML= ''; //Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => { // .results é onde os os dados dos personagens são obtidos nessa api

            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className="characters-name-bg"

            const characterName = document.createElement("span")
            characterName.className="character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)

            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML="" //Limpar os resultados anterirores

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className ="character-image"
                modalContent.appendChild(characterImage)

                const characterNameModal = document.createElement("span")
                characterNameModal.className="character-modal"
                characterNameModal.innerText = `Nome: ${character.name}`
                modalContent.appendChild(characterNameModal)

                const characterHeight = document.createElement("span")
                characterHeight.className="character-modal"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`
                modalContent.appendChild(characterHeight)

                const characterMass = document.createElement("span")
                characterMass.className="character-modal"
                characterMass.innerText = `Peso: ${convertMass(character.mass)}`
                modalContent.appendChild(characterMass)

                const characterEyeColor = document.createElement("span")
                characterEyeColor.className="character-modal"
                characterEyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`
                modalContent.appendChild(characterEyeColor)

                const characterBirth = document.createElement("span")
                characterBirth.className="character-modal"
                characterBirth.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`
                modalContent.appendChild(characterBirth)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url;

    } catch (error){
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage(){
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
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

        await loadCharacters(responseJson.previous)
    } catch (error) { 
    console.log(error);
    alert('Erro ao carregar a página anterior')
    } 
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertEyeColor(eyeColor) {
    const cores ={
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        white: "branco",
        unknown: "desconhecida"

    };

    return cores[eyeColor.toLowerCase()] || eyeColor
}

function convertHeight(height) {

    if(height === "unknown"){
        return "desconhecida"
    }

    return (height/100).toFixed(2)
}

function convertMass(mass) {

    if(mass === "unknown"){
        return "desconhecido"
    }

    return `${mass} Kg`
}

function convertBirthYear(birth_year) {

    if(birth_year === "unknown"){
        return "desconhecido"
    }

    return birth_year
}