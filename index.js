import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
let prevRadioElement = null

emotionRadios.addEventListener('change', highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
document.addEventListener('dblclick', closeModal)
getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    let currentRadioElemnet = document.getElementById(e.target.id).parentElement
    currentRadioElemnet.classList.add('highlight')
    if(prevRadioElement)
        prevRadioElement.classList.remove('highlight')
    prevRadioElement = currentRadioElemnet
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    if (catObject) {
        memeModalInner.innerHTML =  
        `<img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
        >`
        memeModal.style.display = 'flex'
    }
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray) {
        const randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
}

function getMatchingCatsArray(){  
    const checkedRadio = document.querySelector('input[type="radio"]:checked')
    if(checkedRadio){
        const selectedEmotion = checkedRadio.value
        const isGifOnly = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter( cat => {
            if(isGifOnly)
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            else
                return cat.emotionTags.includes(selectedEmotion)
        })

        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)