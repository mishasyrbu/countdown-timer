import React from 'react';
import { shallow, mount } from 'enzyme';

import StartControls from './StartControls';
import Button from '../Button';

describe('<StartControls />', () => {
    it('should not simulate click event, button disabled', () => {
        const onStartButtonClick = jest.fn();
        const startControls = shallow(<StartControls onStart={onStartButtonClick} />);
        startControls.find(Button).simulate('click');

        expect(onStartButtonClick).toBeCalledTimes(0);
    });

    it('should validate input and allow only numbers', () => {
        const onStartButtonClick = jest.fn();
        const startControls = mount(<StartControls onStart={onStartButtonClick} />);
        const input = startControls.find('input');
        input.simulate('change', { target: { value: '1', validity: { valid: true } } });
        input.simulate('blur', {});

        expect(startControls.find('input').prop('value')).toEqual('1');

        startControls.find(Button).simulate('click');
        expect(onStartButtonClick).toBeCalledTimes(1);
    });

    it('should validate input and not allow letters', () => {
        const onStartButtonClick = jest.fn();
        const startControls = mount(<StartControls onStart={onStartButtonClick} />);
        startControls.find('input').simulate('change', { target: { value: 't', validity: { valid: false } } });
        startControls.find(Button).simulate('click');

        expect(startControls.find('input').prop('value')).toEqual('');
        expect(onStartButtonClick).toBeCalledTimes(0);
    });
});
