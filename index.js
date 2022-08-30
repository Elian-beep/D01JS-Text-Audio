const textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechbtn = document.querySelector('.submit');

let synth = speechSynthesis; /* <-- */
let isSpeaking = true;

function voiceSpeech(){
    for(let voice of synth.getVoices()){
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
        console.log(option);
    }
}

synth.addEventListener('voiceschanged', voiceSpeech); /* <-- */

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){ /* <-- */
        if (voice.name === voiceList.value) { /* <-- */
            utternance.voice = voice;
        }
    }

    speechSynthesis.speak(utternance); /* <-- */
}

speechbtn.addEventListener('click', (e) => {
    e.preventDefault(); /* <-- */
    if (textarea.value != '') {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechbtn.innerHTML = 'Pause Speech';
            }else{
                synth.pause();
                isSpeaking = true;
                speechbtn.innerHTML = 'Resume Speech';
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechbtn.innerHTML = 'Convert To Speech';
                }
            });
        }else{
            speechbtn.innerHTML = 'Convert To Speech';
        }
    }
});