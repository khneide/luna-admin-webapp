import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authenticator, useTheme, View, Image, Text } from '@aws-amplify/ui-react';
import liliaLogo from './assets/logos/dark_logo_transparent_background.png';

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Lilia Logo"
          src={liliaLogo}
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; Luna Admin
        </Text>
      </View>
    );
  },
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <Authenticator components={components} hideSignUp socialProviders={['google']}>
        {({ signOut, user }) => (
          <App signOut={signOut} user={user} />
        )}
      </Authenticator>
    </Authenticator.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
