import { useRef, useState } from "react";

const TextToVoice = () => {

    const rate = useRef<HTMLInputElement>(null);
    const rateLabel = useRef<HTMLInputElement>(null);
    const volume = useRef<HTMLInputElement>(null);
    const volumeLabel = useRef<HTMLInputElement>(null);
    const pitch = useRef<HTMLInputElement>(null);
    const pitchLabel = useRef<HTMLInputElement>(null);


    const start = useRef<HTMLButtonElement>(null);
    const pause = useRef<HTMLButtonElement>(null);
    const resume = useRef<HTMLButtonElement>(null);
    const cancel = useRef<HTMLButtonElement>(null);
    const voicesList = useRef<HTMLSelectElement>(null);
    const [textInput, setTextInput] = useState("");

    // Initialize new SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance();

    // Set Speech Language
    speech.lang = "en";

    let voices: SpeechSynthesisVoice[] = []; // global array of available voices

    window.speechSynthesis.onvoiceschanged = () => {
        // Get List of Voices
        voices = window.speechSynthesis.getVoices();
        // console.log(voices)
        // Initially set the First Voice in the Array.
        speech.voice = voices[0];

        // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
        if (voicesList.current) {
            voices.forEach((voice: SpeechSynthesisVoice, i: number) => {
                if (voicesList.current) {
                    voicesList.current.options[i] = new Option(voice.name, i + "", true, true)
                }
            });
        }
    };

    if (rate.current) {
        rate.current.addEventListener("input", () => {
            // Get rate Value from the input
            // Set rate property of the SpeechSynthesisUtterance instance
            speech.rate = parseInt(rate.current?.value as string);

            // Update the rate label
            if (rateLabel.current) {
                rateLabel.current.innerHTML = rate.current?.value as string;
            }
        });
    }

    if (volume.current) {
        volume.current.addEventListener("input", () => {
            // Get volume Value from the input
            // Set volume property of the SpeechSynthesisUtterance instance
            speech.volume = parseInt(volume.current?.value as string);

            // Update the volume label
            if (volumeLabel.current) {
                volumeLabel.current.innerHTML = volume.current?.value as string;
            }
        });
    }

    if (pitch.current) {
        pitch.current.addEventListener("input", () => {
            // Get pitch Value from the input
            // Set pitch property of the SpeechSynthesisUtterance instance
            speech.pitch = parseInt(pitch.current?.value as string);

            // Update the pitch label
            if (pitchLabel.current) {
                pitchLabel.current.innerHTML = pitch.current?.value as string;
            }
        });
    }


    return (
        <>
            <div className="container mt-5 flex-column p-5">
                <h1 className="text-light">Text to Speech</h1>
                <p className="lead text-light mt-4">Select Voice</p>

                <select
                    ref={voicesList}
                    id="voicesList"
                    onChange={() => {
                        if (voicesList.current)
                            speech.voice = voices[voicesList.current?.selectedIndex];
                    }}
                    className="form-select bg-secondary text-light"
                ></select>

                <div className="d-flex mt-4 text-light flex-wrap flex-wrap">
                    <div className="m-auto">
                        <p className="lead">Volume</p>
                        <input ref={volume} type="range" min="0" max="10" value={volume.current?.value} step="0.1" id="volume" />
                        <span ref={volumeLabel} id="volume-label" className="ms-2">1</span>
                    </div>
                    <div className="m-auto">
                        <p className="lead">Rate</p>
                        <input ref={rate} type="range" min="0.1" max="10" value={rate.current?.value} id="rate" step="0.1" />
                        <span ref={rateLabel} id="rate-label" className="ms-2">1</span>
                    </div>
                    <div className="m-auto">
                        <p className="lead">Pitch</p>
                        <input ref={pitch} type="range" min="0" max="10" value={pitch.current?.value} step="0.1" id="pitch" />
                        <span ref={pitchLabel} id="pitch-label" className="ms-2">1</span>
                    </div>
                </div>

                <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="form-control bg-dark text-light mt-5" cols={30} rows={10} placeholder="Type here..."></textarea>

                <div className="mb-5 d-flex flex-wrap justify-content-center align-content-center">
                    <button ref={start} id="start" className="btn btn-success mt-5 me-3"
                        onClick={() => {
                            // Set the text property with the value of the textarea
                            speech.text = textInput;
                            console.log(speech)
                            // Start Speaking
                            window.speechSynthesis.speak(speech);
                        }}
                    >Start</button>
                    <button ref={pause}
                        id="pause"
                        className="btn btn-warning mt-5 me-3"
                        onClick={() => {
                            window.speechSynthesis.pause();
                        }}
                    >Pause</button>
                    <button ref={resume} id="resume" className="btn btn-info mt-5 me-3"
                        onClick={() => {
                            // Resume the paused speechSynthesis instance
                            window.speechSynthesis.resume();
                        }}
                    >Resume</button>
                    <button ref={cancel} id="cancel" className="btn btn-danger mt-5 me-3"
                        onClick={() => {
                            // Cancel the speechSynthesis instance
                            window.speechSynthesis.cancel();
                        }}
                    >Cancel</button>
                </div>
            </div>
        </>
    )
}

export default TextToVoice
