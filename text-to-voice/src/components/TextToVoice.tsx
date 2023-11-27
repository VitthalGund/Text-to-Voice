import { useRef, useState, useEffect, useMemo } from "react";

const TextToVoice = () => {
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
    const [textInput, setTextInput] = useState("Hey its vitthal");
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    const start = useRef<HTMLButtonElement>(null);
    const pause = useRef<HTMLButtonElement>(null);
    const resume = useRef<HTMLButtonElement>(null);
    const cancel = useRef<HTMLButtonElement>(null);
    const voicesList = useRef<HTMLSelectElement>(null);

    const speech = useMemo(() => new SpeechSynthesisUtterance(), []);
    // const speech = new SpeechSynthesisUtterance();
    speech.lang = "en";

    useEffect(() => {
        const handleVoicesChanged = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            setSelectedVoiceIndex(0);
        };

        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        if (voicesList.current) {
            voicesList.current.options.length = 0;
            voices.forEach((voice, i) => {
                if (voicesList.current) {
                    voicesList.current.options[i] = new Option(voice.name, i.toString());
                }
            })
        }
        // Update the properties of the existing speech object
        speech.voice = voices[selectedVoiceIndex];
        speech.volume = volume;
        speech.rate = rate;
        speech.pitch = pitch;
        speech.text = textInput;
    }, [voices, selectedVoiceIndex, volume, rate, pitch, textInput, speech]);

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(e.target.value, 10);
        setSelectedVoiceIndex(selectedIndex);
    };

    return (
        <>
            <div className="container mt-5 flex-column p-5">
                <h1 className="text-light">Text to Speech</h1>
                <p className="lead text-light mt-4">Select Voice</p>

                <select
                    ref={voicesList}
                    id="voicesList"
                    onChange={handleVoiceChange}
                    value={selectedVoiceIndex}
                    className="form-select bg-secondary text-light"
                ></select>

                <div className="d-flex mt-4 text-light flex-wrap flex-wrap">
                    <div className="m-auto">
                        <p className="lead">Volume</p>
                        <input value={volume} type="range" min={0} max={10} step={0.1} id="volume" onChange={(e) => {
                            console.log(parseFloat(e.target.value))
                            speech.volume = (parseFloat(e.target.value));
                            setVolume(e.target.valueAsNumber);
                        }} />
                        <span id="volume-label" className="ms-2">{volume}</span>
                    </div>
                    <div className="m-auto">
                        <p className="lead">Rate</p>
                        <input value={rate} type="range" min={0} max={10} onChange={(e) => {
                            speech.rate = e.target.valueAsNumber;
                            setRate(e.target.valueAsNumber);
                        }} id="rate" step={0.1} />
                        <span id="rate-label" className="ms-2">{rate}</span>
                    </div>
                    <div className="m-auto">
                        <p className="lead">Pitch</p>
                        <input value={pitch} type="range" min={0} max={10} onChange={(e) => {
                            speech.pitch = e.target.valueAsNumber;
                            setPitch(e.target.valueAsNumber);
                        }} step={0.1} id="pitch" />
                        <span id="pitch-label" className="ms-2">{pitch}</span>
                    </div>
                </div>

                <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="form-control bg-dark text-light mt-5" cols={30} rows={10} placeholder="Type here..."></textarea>

                <div className="mb-5 d-flex flex-wrap justify-content-center align-content-center">
                    <button
                        ref={start} id="start"
                        className="btn btn-success mt-5 me-3"
                        onClick={() => {
                            // Set the text property with the value of the textarea
                            speech.text = textInput;
                            // Start Speaking
                            speech.volume = volume;
                            // console.log(speech)
                            window.speechSynthesis.speak(speech);
                        }}
                    >Start</button>
                    <button
                        ref={pause}
                        id="pause"
                        className="btn btn-warning mt-5 me-3"
                        onClick={() => {
                            window.speechSynthesis.pause();
                        }}
                    >Pause</button>
                    <button
                        ref={resume}
                        id="resume"
                        className="btn btn-info mt-5 me-3"
                        onClick={() => {
                            // Resume the paused speechSynthesis instance
                            window.speechSynthesis.resume();
                        }}
                    >Resume</button>
                    <button
                        ref={cancel}
                        id="cancel"
                        className="btn btn-danger mt-5 me-3"
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
