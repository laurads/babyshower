import React from 'react';
import NameRatingForm from './NameRatingForm';
import NameRating from './NameRating';
import Enzyme, {shallow, mount} from 'enzyme';
import {Form, Input, Button} from 'semantic-ui-react';
import jsdom from 'jsdom';
import 'jsdom-global/register';
import {mountWithIntl, shallowWithIntl} from '../helpers/intlTest';
import sinon from 'sinon';

describe('<NameRatingForm />', () => {
    
    const names= [
        {
            name: 'Sofia',
            rating: 0
        },
        {
            name: 'Donna',
            rating: 0
        },
        {
            name: 'Julia',
            rating: 0
        }
    ];

    const saveNamesRatingAndOther = jest.fn();

    it('should render correctly with no props', () => {
        const wrapper = mountWithIntl(<NameRatingForm names={names}/>);
        const wrapperWithoutProps = shallowWithIntl(<NameRatingForm/>);
        expect(wrapperWithoutProps).toMatchSnapshot();
        wrapper.unmount();
    });

    it('should render a Form', () => {
        const wrapper = mountWithIntl(<NameRatingForm names={names}/>);
        const form = wrapper.find('Form');
        expect(form).toHaveLength(1);
        wrapper.unmount();
    });

    it('should render an Input', () => {
        const wrapper = mountWithIntl(<NameRatingForm names={names}/>);
        const input = wrapper.find('Input');
        expect(input).toHaveLength(1);
        wrapper.unmount();
    });

    it('should render a Button', () => {
        const wrapper = mountWithIntl(<NameRatingForm names={names}/>);
        const button = wrapper.find('Button');
        expect(button).toHaveLength(1);
        wrapper.unmount();
    });

    it('should render 3 NameRating', () => {
        const wrapperIntl = mountWithIntl(
            <NameRatingForm 
                names={names} 
                saveNamesRatingAndOther={saveNamesRatingAndOther}
            />);
        expect(wrapperIntl.find('NameRating')).toHaveLength(3);
        wrapperIntl.unmount();
    });

    it('should not return an error if names is empty', () => {
        const emptyNames = [];
        const wrapperIntl = mountWithIntl(
            <NameRatingForm 
                names={emptyNames} 
                saveNamesRatingAndOther={saveNamesRatingAndOther}
            />);
        expect(wrapperIntl.find('NameRating')).toHaveLength(0);
        wrapperIntl.unmount();
    });

    /*it('should call handleChange function when fill the input in', () => {
        let spy = sinon.spy(NameRatingForm.prototype, 'handleChange');
        const wrapperIntl = mountWithIntl(
            <NameRatingForm 
                saveNamesRatingAndOther={saveNamesRatingAndOther}
                names={names}
            />);

        // wrapperIntl.instance().handleChange = jest.fn();
        // wrapperIntl.instance().forceUpdate();
        // wrapperIntl.update();
       let input =  wrapperIntl.find('input');
       input.simulate('change', { target : { value: 'name' }});
        expect(spy).toHaveBeenCalled();
        wrapperIntl.unmount();
    });

    it('should update state other when fill the input in', () => {
        const wrapperIntl = mountWithIntl(<NameRatingForm names={names}/>);
        const newValue = 'prenom';
        console.log(wrapperIntl.find('input'));
        wrapperIntl.find('input').simulate('change', { target : {value: newValue }});
        const other = wrapperIntl.state().other;
        expect(other).toEqual(newValue);
        wrapperIntl.unmount();
    });*/

    /*it('should call handleSubmit function on submit', () => {
        const onChange = jest.fn();
        const props = {
            names: {names},
            saveNamesRatingAndOther:{saveNamesRatingAndOther},
            onChange
        }
        const wrapperIntl = mountWithIntl(
            <NameRatingForm {...props} />);
        wrapperIntl.instance().handleSubmit = jest.fn();
        wrapperIntl.instance().forceUpdate();
        wrapperIntl.update();
        wrapperIntl.find('form').simulate('submit');
        expect(wrapperIntl.instance().handleSubmit).toHaveBeenCalled();
    });*/

    it('should call saveNamesRatingAndOther function on submit', () => {
        const wrapperIntl = mountWithIntl(
            <NameRatingForm 
                saveNamesRatingAndOther={saveNamesRatingAndOther}
                names={names}
            />);
        wrapperIntl.find('Form').simulate('submit');
        expect(saveNamesRatingAndOther).toHaveBeenCalled();
        wrapperIntl.unmount();
    });
});