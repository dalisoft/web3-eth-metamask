/* eslint-disable react/prop-types */
import {
  Button, Input, Field, Control
} from 'rbx';
import { observer } from 'mobx-react';
import stores from '../../stores';

const Info = ({
  signature, wallet, hash, message, error
}) => (error ? <div>{JSON.stringify(error)}</div> : (
  <div>
    <span>
Message:
      {' '}
      {message}
    </span>
    <br />
    <span>
Signature:
      {' '}
      {signature}
    </span>
    <br />
    <span>
Wallet:
      {' '}
      {wallet}
    </span>
    <br />
    <span>
Hash:
      {' '}
      {hash}
    </span>
  </div>
));

const DataSign = () => (
  <div>
    <Field horizontal>
      <Field.Body>
        <Control>
          <Input
            type="text"
            placeholder="Enter a text"
            value={stores.message}
            onChange={stores.setMessage}
            color="primary"
          />
        </Control>
        <span>&nbsp;</span>
        <Control>
          <Button as="a" color="primary" onClick={stores.handleMetamaskAuth}>
            <span>Try out</span>
          </Button>
        </Control>
      </Field.Body>
    </Field>
    <br />
    {stores.metamaskResult && <Info {...stores.metamaskResult} />}
  </div>
);

export default observer(DataSign);
