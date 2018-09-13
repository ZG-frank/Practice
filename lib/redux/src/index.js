import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Provider from './store/provider';
import createStore from './store/createStore';
import reducer from './store/reducer';

import Header from './component/Header';
import Content from './component/Content';
import './index.less';

const store = createStore(reducer);

class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>, 
    document.getElementById('root')
);
