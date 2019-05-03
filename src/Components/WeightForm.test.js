import React from 'react';
import WeightForm from './WeightForm';
import Enzyme, {shallow, mount} from 'enzyme';
import {Form, Input, Button} from 'semantic-ui-react';
import jsdom from 'jsdom';
import 'jsdom-global/register';
import {mountWithIntl} from '../helpers/intlTest';

describe('<WeightForm />', () => {
    const wrapper = shallow(<WeightForm/>);
    const newValue = '3.600';

    it('should render correctly with no props', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a Form', () => {
        const form = wrapper.find('Form').first();
        expect(form).toBeDefined();
    });

    it('should render an Input', () => {
        expect(wrapper.find('Input').first()).toBeDefined();
    });

    it('should render a Button', () => {
        const button = wrapper.find('Button').first();
        expect(button).toBeDefined();
    });

    it('should call handleChange function when fill the input in', () => {
        wrapper.instance().handleChange = jest.fn();
        wrapper.instance().forceUpdate();
        wrapper.update();
        wrapper.find('Input').simulate('change', { target : { value: newValue }});
        expect(wrapper.instance().handleChange).toHaveBeenCalled();
    });

    it('should update state weight when fill the input in', () => {
        const wrapperIntl = mountWithIntl(<WeightForm/>);
        let input = wrapperIntl.find('input');
        expect(input).toHaveLength(1);        
        input.simulate('change', { target : {value: newValue }});
        const weight = wrapperIntl.state().weight;
        expect(weight).toEqual(newValue);
        wrapperIntl.unmount();
    });

    it('should call handleValidateSubmit function on submit', () => {
        wrapper.instance().handleValidateSubmit = jest.fn();
        wrapper.instance().forceUpdate();
        wrapper.update();
        wrapper.find('Form').simulate('submit');
        expect(wrapper.instance().handleValidateSubmit).toHaveBeenCalled();
    });

    it('should call validateForm function on submit', () => {
        const validateForm = jest.fn();
        const wrapperIntl = mountWithIntl(<WeightForm validateForm={validateForm}/>);
        wrapperIntl.find('Form').simulate('submit');
        expect(validateForm).toHaveBeenCalled();
        wrapperIntl.unmount();
    });

    /*it('should call validateForm with good value function on submit', () => {
        const validateForm = jest.fn();
        const wrapperIntl = mountWithIntl(<WeightForm validateForm={validateForm}/>);
        wrapperIntl.find('Form').simulate('submit');
        expect(validateForm).toHaveBeenCalledWith(newValue);
        wrapperIntl.unmount();
    });*/
});