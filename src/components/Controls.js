import React from 'react';

class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.setSpeed = this.setSpeed.bind(this);
    }

    setSpeed(speed) {
        this.props.setSpeed(speed);
    }

    render() {
        return (
            <>
                <section>
                    <h3>Controls</h3>
                    <div className="controls" role="radiogroup">
                        <div>Simulations: {this.props.currentIterations}</div>
                        <div className="speed-controls">
                            <div id="loop-speed">Speed:</div>
                            <div>
                                <label className="radio-container" htmlFor="slow">
                                    <input id="slow"
                                        name="speed"
                                        type="radio"
                                        onChange={(e) => { this.setSpeed('slow') }}
                                        checked={this.props.currentSpeed === 'slow' ? 'checked' : ''} /> Slow (1 sim/s)
                                </label>
                            </div>
                            <div>
                                <label className="radio-container" htmlFor="fast">
                                    <input id="fast"
                                        name="speed"
                                        type="radio"
                                        onChange={(e) => { this.setSpeed('fast') }}
                                        checked={this.props.currentSpeed === 'fast' ? 'checked' : ''} /> Fast (10,000 sim/s)
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Controls;