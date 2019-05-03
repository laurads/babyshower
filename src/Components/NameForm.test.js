import React from 'react';
import NameForm from './NameForm';
import Enzyme, {shallow, mount} from 'enzyme';
import {Form, Input, Button} from 'semantic-ui-react';
import jsdom from 'jsdom';
import 'jsdom-global/register';
import {mountWithIntl, shallowWithIntl} from '../helpers/intlTest';

describe('<NameForm />', () => {
    const wrapper = shallowWithIntl(<NameForm/>);

    it('should render correctly with no props', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a Form by default', () => {
        const form = wrapper.find('Form').first();
        expect(form).toBeDefined();
    });

    it('should render an Input by default', () => {
        const input = wrapper.find('Input').first();
        expect(input).toBeDefined();
    });

    it('should render a Button by default', () => {
        const button = wrapper.find('Button').first();
        expect(button).toBeDefined();
    });

    /*it('should call handleChange function when fill the input in', () => {
        const updatePlayerName = jest.fn();
        const wrapperIntl = mountWithIntl(<NameForm updatePlayerName={updatePlayerName}/>);
        wrapperIntl.instance().handleChange = jest.fn();
        wrapperIntl.instance().forceUpdate();
        wrapperIntl.update();
        console.log(wrapperIntl.find('Input').debug());
        wrapperIntl.find('Input').simulate('change', { target : {value: 'newName' }});
        expect(wrapperIntl.instance().handleChange).toHaveBeenCalled();
        wrapperIntl.unmount();
    });

    it('should update state name when fill the input in', () => {
        const wrapperIntl = mountWithIntl(<NameForm/>);
        const newValue = 'newName';
        wrapperIntl.find('input').simulate('change', { target : {value: newValue }});
        const name = wrapperIntl.state().name;
        expect(name).toEqual(newValue);
        wrapperIntl.unmount();
    });

    it('should call handleValidateSubmit function on submit', () => {
        const updatePlayerName = jest.fn();
        const wrapperIntl = mountWithIntl(<NameForm updatePlayerName={updatePlayerName}/>);
        wrapperIntl.instance().storeName = jest.fn();
        wrapperIntl.instance().forceUpdate();
        wrapperIntl.update();
        wrapperIntl.find('Form').simulate('submit');
        expect(wrapperIntl.instance().storeName).toHaveBeenCalled();
        wrapperIntl.unmount();
    });*/

    it('should call validateForm function on submit', () => {
        const updatePlayerName = jest.fn();
        const wrapperIntl = mountWithIntl(<NameForm updatePlayerName={updatePlayerName}/>);
        wrapperIntl.find('Form').simulate('submit');
        expect(updatePlayerName).toHaveBeenCalled();
        wrapperIntl.unmount();
    });
});