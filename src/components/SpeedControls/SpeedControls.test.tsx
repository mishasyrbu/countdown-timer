import React from 'react';
import { shallow } from 'enzyme';

import SpeedControls from './SpeedControls';
import { TIMER_SPEED_MODE } from '.';
import Button from '../Button';

describe('<SpeedControls />', () => {
    it('should render all defined modes', () => {
        const onButtonChange = jest.fn();
        const speedControls = shallow(<SpeedControls onChange={onButtonChange} />);

        expect(speedControls.find(Button).length)
            .toEqual(Object.keys(TIMER_SPEED_MODE).length);
    });

    it('should simulate click event', () => {
        const onButtonChange = jest.fn();
        const speedControls = shallow(<SpeedControls onChange={onButtonChange} />);
        speedControls.find(Button).first().simulate('click');

        expect(onButtonChange).toBeCalledTimes(1);
    });
});
