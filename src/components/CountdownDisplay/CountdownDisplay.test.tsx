import React from 'react';
import { mount } from 'enzyme';

import CountdownDisplay from './CountdownDisplay';

describe('<CountdownDisplay />', () => {
    it('should simulate play click event', () => {
        const onPlayStopClick = jest.fn();
        const speedControls = mount(<CountdownDisplay onPlayStop={onPlayStopClick} isOn time={670} initialTime={700} />);
        speedControls.find('button').first().simulate('click', { preventDefault: jest.fn() });

        expect(onPlayStopClick).toBeCalledTimes(1);
    });

    it('should simulate pause click event', () => {
        const onPlayStopClick = jest.fn();
        const speedControls = mount(<CountdownDisplay onPlayStop={onPlayStopClick} time={10} initialTime={100} />);
        speedControls.find('button').first().simulate('click', { preventDefault: jest.fn() });

        expect(onPlayStopClick).toBeCalledTimes(1);
    });

    it('should simulate timer finish', () => {
        const onPlayStopClick = jest.fn();
        const speedControls = mount(<CountdownDisplay onPlayStop={onPlayStopClick} isOn={false} time={1} initialTime={100} />);
        speedControls.setProps({ time: 0 });

        expect(speedControls.find('button').length).toEqual(0);
    });
});
