import React from 'react';

import { AppProps, AppState } from './index';
import SpeedControls from '../components/SpeedControls';
import CountdownDisplay from '../components/CountdownDisplay';
import StartControls from '../components/StartControls';
import './App.scss';

class App extends React.Component<AppProps, AppState> {
    timer: NodeJS.Timeout | null = null;

    state = {
        speed: 1000,
        isOn: false,
        initialTime: 0,
        time: 0,
    };

    startTimer = async () => {
        const { speed } = this.state;

        await this.setState({ isOn: true });
        this.timer = setInterval(() =>
            this.setState(({ time }): AppState => {
                if (time === 0) {
                    this.timer && clearInterval(this.timer);
                    this.playNotification();

                    return { time, initialTime: null, isOn: false };
                }

                return { time: time - 1 };
            }), speed);
    };

    stopTimer = async () => {
        await this.setState({ isOn: false });
        this.timer && clearInterval(this.timer);
    };

    playNotification = () => {
        const soundEffect = new Audio(require('./assets/audio/notification.mp3'));
        return soundEffect.play();
    };

    onStartClick = async (minutes: number) => {
        const seconds = minutes * 60;

        await this.stopTimer();
        await this.setState({ initialTime: seconds, time: seconds });
        await this.startTimer();
    };

    onPlayStopClick = () => {
        const { isOn } = this.state;

        isOn ? this.stopTimer() : this.startTimer();
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
        const { isOn, initialTime, time } = this.state;

        return (
            <div className="app-container">
                <StartControls onStart={this.onStartClick} />
                    <CountdownDisplay
                        isOn={isOn}
                        time={time}
                        initialTime={initialTime}
                        onPlayStop={this.onPlayStopClick}
                    />
                <SpeedControls onChange={this.onSpeedChange} />
            </div>
        );
    }
}

export default App;
