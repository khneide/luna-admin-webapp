import { Amplify, Auth } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

Auth.currentUserInfo()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

export default function App() {
  return (
    <Authenticator hideSignUp socialProviders={['google']} variation="modal">
      {({ signOut, user }) => (
        <main>
          <h1>Hello {JSON.stringify(user?.attributes?.email)}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}