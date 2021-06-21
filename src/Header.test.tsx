import React from 'react';
import { render, screen, cleanup, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from './components/UI/Nav/Nav';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

afterEach(cleanup)
jest.useFakeTimers()

describe("<Nav />", () => {
  let wrapper;
  it("should test if Nav component renders", async () => {    
    const navComponent = shallow(<Nav />);
    expect(navComponent.exists()).toBe(true);
    wrapper = shallow(<Nav />)
  });
  
  it("should trigger page scroll", async () => {
    
    render(<Nav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    wrapper.find('.navbar-toggler').simulate('click');
  });

});