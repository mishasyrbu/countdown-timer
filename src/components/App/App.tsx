import React from 'react';

import { AppProps, AppState } from '.';
import SpeedControls from '../SpeedControls';
import CountdownDisplay from '../CountdownDisplay';
import StartControls from '../StartControls';
import './App.scss';

class App extends React.Component<AppProps, AppState> {
    private timer: NodeJS.Timeout | null = null;

    state = {
        speed: 1000,
        isOn: false,
        initialTime: 0,
        time: 0,
    };

    startTimer = async () => {
        const { speed } = this.state;

        await this.setState({ isOn: true });
        this.timer = setInterval(() => {
            this.setState(({ time }) => ({ time: time - 1 }))
        }, speed);
    };

    stopTimer = async () => {
        await this.setState({ isOn: false });
        this.timer && clearInterval(this.timer)
    };

    onStartClick = async (minutes: number) => {
        const seconds = minutes * 60;

        await this.stopTimer();
        await this.setState({ initialTime: seconds, time: seconds });
        this.startTimer();
    };

    onPlayStopClick = () => {
        const { isOn } = this.state;

        if (isOn) {
            return this.stopTimer();
        }

        return this.startTimer();
    };

    onSpeedChange = async (value: number) => {
        const { isOn } = this.state;

        await this.setState({ speed: 1000 / value });

        if (isOn) {
            await this.stopTimer();
            await this.startTimer();
        }
    };

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
