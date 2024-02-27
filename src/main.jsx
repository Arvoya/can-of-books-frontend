import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider} from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <Auth0Provider
            domain="dev-xq8ab6qdlhcv0xbh.us.auth0.com"
            clientId="h3rNw6TS8WxiTuHBvLxBESnEpC34cXw1"
            authorizationParams={{
                 redirect_uri: window.location.origin
            }}
       >
            <App />
       </Auth0Provider>
  </React.StrictMode>
);
