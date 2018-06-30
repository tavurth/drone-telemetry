import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

// Show why components updated
// if (process.env.NODE_ENV !== 'production') {
//     require('why-did-you-update').whyDidYouUpdate(React);
// }

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
