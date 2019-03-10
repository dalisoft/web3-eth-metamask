import {
  Button, Control, Field, Input, Icon
} from 'rbx';
import { observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import stores from '../../stores';

const LoginForm = () => (
  <>
    <Field>
      <Control iconLeft iconRight>
        <Input type="text" placeholder="Login" value={stores.login} onChange={stores.setLogin} />
        <Icon size="small" align="left">
          <FontAwesomeIcon icon={faEnvelope} />
        </Icon>
      </Control>
    </Field>
    <Field>
      <Control iconLeft>
        <Input
          type="password"
          placeholder="Password"
          value={stores.password}
          onChange={stores.setPassword}
        />
        <Icon size="small" align="left">
          <FontAwesomeIcon icon={faLock} />
        </Icon>
      </Control>
    </Field>
    <Field>
      <Control>
        <Button
          color={stores.loginBtnColor}
          state={stores.loginState}
          onClick={stores.handleLogin}
        >
Login

        </Button>
      </Control>
    </Field>
  </>
);

export default observer(LoginForm);
