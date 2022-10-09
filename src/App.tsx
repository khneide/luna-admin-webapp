import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from './aws-exports';
import { getNameById } from './graphql/queries';

Amplify.configure(awsExports);

const getName = async () => {
  const name = await API.graphql(graphqlOperation(getNameById, { pk: "1", sk: "1" }));
  console.log(name);
}

export default function App() {
  return (
    <Authenticator hideSignUp socialProviders={['google']} variation="modal">
      {({ signOut, user }) => (
        <main>
          <h1>Hello {JSON.stringify(user?.attributes?.email)}</h1>
          <button onClick={getName}>Get Name</button>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}