import React from 'react';
import { render, screen, cleanup, act, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure, ShallowWrapper  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Articles from "./components/sections/Articles/Articles";
import axios from 'axios';

import { fakeArticles } from './services/fakeData';
import { unmountComponentAtNode } from 'react-dom';

configure({ adapter: new Adapter() });

describe("<Articles />", () => {

  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let container = null;
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    wrapper = shallow(<Articles loading={true}/>, { disableLifecycleMethods: true });
    
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    wrapper.unmount();
    
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("Must render a loading view before successful api call", () => {
    render(<Articles loading={true} />, container);
    expect(wrapper.find("div.loadHolder").exists()).toBeTruthy();
  });

  it("must show list of articles and hide the loading view after api call success", (done) => {
    const navComponent = shallow(<Articles />);
    expect(navComponent.exists()).toBe(true);
    render(<Articles loading={false}/>);
    
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve(fakeArticles);
        }
      });
    });

    wrapper.update();
    fetch.mockClear();
    done();
  });
});
