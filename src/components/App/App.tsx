import React from 'react';

import { AppProps, AppState } from '.';
import SpeedControls from '../SpeedControls';
import CountdownDisplay from '../CountdownDisplay';
import StartControls from '../StartControls';
import './App.scss';

class App extends React.Component<AppProps, AppState> {
    private timer: NodeJS.Timeout | null = null;

    state = {
        isOn: false,
        time: 0,
    };

    startTimer = async () => {
        await this.setState({ isOn: true });
        this.timer = setInterval(() => {
            this.setState(({ time }) => ({ time: time - 1 }))
        }, 1000);
    };

    stopTimer = async () => {
        await this.setState({ isOn: false });
        this.timer && clearInterval(this.timer)
    };

    onStartClick = async (minutes: number) => {
        await this.stopTimer();
        await this.setState({ time: minutes * 60 });
        this.startTimer();
    };

    onPlayStopClick = () => {
        const { isOn } = this.state;

        if (isOn) {
            return this.stopTimer();
        }

        return this.startTimer();
    };

    onSpeedChange = () => {};

    render() {
        const { isOn, time } = this.state;

        return (
            <div className="app-container">
                <StartControls onStart={this.onStartClick} />
                    <CountdownDisplay
                        isOn={isOn}
                        value={time}
                        onPlayStop={this.onPlayStopClick}
                    />
                <SpeedControls onChange={this.onSpeedChange} />
            </div>
        );
    }
}

export default App;
