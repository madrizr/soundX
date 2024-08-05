const btnStartRecord = document.getElementById('btnStartRec');
const btnStopRecord = document.getElementById('btnStopRec');
const btnPlayText = document.getElementById('btnPlayText')
const textarea = document.getElementById('text');

const loader = document.querySelector('.loader3');

let recognition = new webkitSpeechRecognition();

recognition.lang = 'es-Es'
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    const text = results[results.length -1][0].transcript
    textarea.value += text;
}

recognition.onend = () => {
    loader.style.display="none";
    console.log('El micro dejo de grabar')

}

recognition.onerror = (event) => {
    console.log(event.error)
}

btnStartRecord.addEventListener('click', () => {
    loader.style.display="flex";
    recognition.start()
})

btnStopRecord.addEventListener('click', () => {
    recognition.abort()
})

btnPlayText.addEventListener('click', (event) => {
    if (textarea.value !== '') readText(textarea.value);
})

const readText = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech)
}

