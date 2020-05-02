import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import StartControls from '../components/StartControls';
import SpeedControls from '../components/SpeedControls';
import CountdownDisplay from '../components/CountdownDisplay';

describe('<App />', () => {
    it('should match the snapshot', () => {
        const app = shallow(<App />);

        expect(app.html()).toMatchSnapshot();
    });

    it('should contain all main components', () => {
        const app = shallow(<App />);

        expect(app.find(StartControls).length).toEqual(1);
        expect(app.find(CountdownDisplay).length).toEqual(1);
        expect(app.find(SpeedControls).length).toEqual(1);
    });

    it('should set all values in state on timer start', async () => {
        const app = mount(<App />);
        const appInstance = app.instance() as App;

        await appInstance.onStartClick(100);

        expect(appInstance.timer).toBeTruthy();
        expect(appInstance.state.isOn).toBeTruthy();
        expect(appInstance.state.time).toEqual(6000);
        expect(appInstance.state.initialTime).toEqual(6000);
    });

    it('should properly play/stop', async () => {
        const app = mount(<App />);
        const appInstance = app.instance() as App;

        await appInstance.onStartClick(100);

        expect(appInstance.state.isOn).toBeTruthy();

        await appInstance.onPlayStopClick();

        expect(appInstance.state.isOn).toBeFalsy();

        await appInstance.onPlayStopClick();

        expect(appInstance.state.isOn).toBeTruthy();
    });

    it('should properly speed change', async () => {
        const app = mount(<App />);
        const appInstance = app.instance() as App;

        // check initial value
        expect(appInstance.state.speed).toEqual(1000);

        await appInstance.onSpeedChange(2);

        expect(appInstance.state.speed).toEqual(500);
    });

    it('should properly speed change when timer is on', async () => {
        const app = mount(<App />);
        const appInstance = app.instance() as App;

        await appInstance.onStartClick(100);
        await appInstance.onSpeedChange(2);

        expect(appInstance.state.speed).toEqual(500);
    });

    it('should play notification sound', async () => {
        const playStub = jest
            .spyOn(window.HTMLMediaElement.prototype, 'play')
            .mockImplementation(() => Promise.resolve());
        const app = mount(<App />);
        const appInstance = app.instance() as App;

        await appInstance.playNotification();

        expect(playStub).toHaveBeenCalled();
        playStub.mockRestore();
    });

    it('should start timer with correct arguments', async () => {
        const playStub = jest
            .spyOn(window.HTMLMediaElement.prototype, 'play')
            .mockImplementation(() => Promise.resolve());
        const app = mount(<App />);
        const appInstance = app.instance() as App;
        appInstance.setState({ time: 1, initialTime: 1, isOn: false });

        await appInstance.startTimer();

        expect(appInstance.state.isOn).toBeTruthy();

        await new Promise((r) => setTimeout(r, 3000));

        expect(appInstance.state.isOn).toBeFalsy();
        expect(appInstance.state.time).toBeFalsy();
        expect(appInstance.state.initialTime).toBeFalsy();
        expect(playStub).toHaveBeenCalled();
        playStub.mockRestore();
    });
});
