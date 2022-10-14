import { AmplifyUser } from '@aws-amplify/ui';
import { SignOut } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Authenticator';
import '@aws-amplify/ui-react/styles.css';
import { Layout, Menu } from 'antd';
import { Footer, Header } from 'antd/lib/layout/layout';
import { Amplify } from 'aws-amplify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import liliaLogo from './assets/logos/white_logo_transparent_background.png';
import awsExports from './aws-exports';
import AddFacility from './components/AddFacility';
import AddOrg from './components/AddOrg';
import EditUser from './components/EditUser';
import FacilityList from './components/FacilityList';
import OrgList from './components/OrgList';
import UserList from './components/UserList';
import { PATHS } from './components/utils';

Amplify.configure(awsExports);

const App = ({ signOut, user }: { signOut?: SignOut, user?: AmplifyUser }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <img width="34" className='logo' src={liliaLogo} alt="Lilia logo" />
        <Menu
          style={{ float: 'right' }}
          theme="dark"
          mode="horizontal"
          items={[{
            key: 1,
            label: "Logout",
            onClick: signOut
          }]}
        />
        <span style={{ color: 'white', float: 'right', paddingRight: '10px' }}>{user?.attributes?.email}</span>
      </Header>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.ORG_LIST} element={<OrgList />} />
          <Route path={PATHS.FACILITY_LIST} element={<FacilityList />} />
          <Route path={PATHS.USERS_LIST} element={<UserList />} />
          <Route path={PATHS.ADD_ORG} element={<AddOrg />} />
          <Route path={PATHS.EDIT_ORG} element={<AddOrg edit />} />
          <Route path={PATHS.ADD_FACILITY} element={<AddFacility />} />
          <Route path={PATHS.EDIT_FACILITY} element={<AddFacility edit />} />
          <Route path={PATHS.EDIT_USER} element={<EditUser />} />
        </Routes>
      </BrowserRouter>,
      <Footer style={{ textAlign: 'center' }}>{`©${new Date().getFullYear()} Lilia Health Inc. | Luna Admin`}</Footer>
    </Layout >
  );
}

export default App;