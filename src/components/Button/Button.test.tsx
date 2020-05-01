import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {
    it('should simulate click event', () => {
        const onButtonClick = jest.fn();
        const button = shallow(<Button onClick={onButtonClick} children={'test'}/>);
        button.find('button').simulate('click', { preventDefault: jest.fn() });

        expect(onButtonClick).toBeCalledTimes(1);
    });
});
