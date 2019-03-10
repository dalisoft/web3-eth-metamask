import './style.scss';
import {
  Container, Title, Hero, Navbar, Button, Control, Field, Icon
} from 'rbx';
import { observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';
import DataSign from '../components/DataSign';

import stores from '../stores';

const Logo = () => (
  <Navbar.Brand>
    <Navbar.Item href="#">
      <div className="navbar__logo" />
    </Navbar.Item>
    <Navbar.Burger />
  </Navbar.Brand>
);
// eslint-disable-next-line react/prop-types
const Content = ({ isAuthed }) => (
  <Container>
    <Title>Metamask demo</Title>
    <Title as="h2" subtitle>
  with Web3 + ETH + Metamask API
    </Title>
    {isAuthed && <DataSign />}
  </Container>
);
// eslint-disable-next-line react/prop-types
const SignInOutButton = ({ isAuthed }) => (isAuthed ? (
  <Button as="a" color="info" onClick={stores.handleLogout}>
    <Icon>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Icon>
    <span>Sign Out</span>
  </Button>
)
  : (
    <Button as="a" color="info" onClick={stores.toggleSigninModal}>
      <Icon>
        <FontAwesomeIcon icon={faSignInAlt} />
      </Icon>
      <span>Sign In</span>
    </Button>
  ));

// eslint-disable-next-line react/prop-types
const Menu = observer(({ isAuthed }) => (
  <Navbar.Menu>
    <Navbar.Segment align="end">
      <Navbar.Item as="div">
        <Field kind="group">
          <Control>
            <Modal
              title="Sign In"
              content={<LoginForm />}
              isEnabled={!isAuthed && stores.signinModal}
              toggleModal={stores.toggleSigninModal}
            />
            <SignInOutButton isAuthed={isAuthed} />
          </Control>
        </Field>
      </Navbar.Item>
    </Navbar.Segment>
  </Navbar.Menu>
));

const Home = () => (
  <Hero color="info" size="fullheight">
    <Navbar color="info">
      <Logo />
      <Menu isAuthed={stores.isAuthed} />
    </Navbar>
    <Hero.Body>
      <Content isAuthed={stores.isAuthed} />
    </Hero.Body>
  </Hero>
);

export default observer(Home);
