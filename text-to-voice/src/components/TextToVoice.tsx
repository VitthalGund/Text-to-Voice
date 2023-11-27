
const TextToVoice = () => {
    return (
        <>
            <div className="container mt-5 bg-dark">
                <h1 className="text-light">Text to Speech</h1>
                <p className="lead text-light mt-4">Select Voice</p>

                <select id="voices" className="form-select bg-secondary text-light"></select>

                <div className="d-flex mt-4 text-light">
                    <div>
                        <p className="lead">Volume</p>
                        <input type="range" min="0" max="10" value="1" step="0.1" id="volume" />
                        <span id="volume-label" className="ms-2">1</span>
                    </div>
                    <div className="mx-5">
                        <p className="lead">Rate</p>
                        <input type="range" min="0.1" max="10" value="1" id="rate" step="0.1" />
                        <span id="rate-label" className="ms-2">1</span>
                    </div>
                    <div>
                        <p className="lead">Pitch</p>
                        <input type="range" min="0" max="10" value="1" step="0.1" id="pitch" />
                        <span id="pitch-label" className="ms-2">1</span>
                    </div>
                </div>

                <textarea className="form-control bg-dark text-light mt-5" cols={30} rows={10} placeholder="Type here..."></textarea>

                <div className="mb-5">
                    <button id="start" className="btn btn-success mt-5 me-3">Start</button>
                    <button id="pause" className="btn btn-warning mt-5 me-3">Pause</button>
                    <button id="resume" className="btn btn-info mt-5 me-3">Resume</button>
                    <button id="cancel" className="btn btn-danger mt-5 me-3">Cancel</button>
                </div>
            </div>
        </>
    )
}

export default TextToVoice
