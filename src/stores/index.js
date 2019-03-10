import {
  observable, action, computed, runInAction
} from 'mobx';
import Web3 from 'web3';
import { getWindow } from '../helpers';

// TODO: this only for fake server simulation
const checkLoginValue = data => new Promise((resolve, reject) => {
  if (data.login === 'user0101' && data.password === 'pass0101') {
    return setTimeout(resolve, 2000, {
      status: 'ok',
      code: 200,
      user: {
        login: data.login,
        metamask: null
      }
    });
  }
  return setTimeout(reject, 1000, new Error(JSON.stringify({
    status: 'error',
    code: 401,
    user: null,
    message: 'User doesn\'t exists in our database, sorry'
  })));
});

class MyStore {
  @computed get isUserExists() {
    return getWindow(win => win.localStorage.getItem('user'), false);
  }
  @computed get loginBtnColor() {
    return this.loginState === 'error' ? 'danger' : this.loginState === 'loading' ? 'info' : 'success'; // eslint-disable-line no-nested-ternary,max-len
  }

    @observable isAuthed = false;
    @observable signinModal = false;
    @observable loginState = 'none';
    @observable login = '';
    @observable password = '';
    @observable metamaskResult = null;
    @observable message = '';

    @action handleLogin = () => {
      this.loginState = 'loading';
      checkLoginValue({
        login: this.login,
        password: this.password
      })
        .then(response => getWindow(win => win.localStorage.setItem('user', JSON.stringify(response.user))))
        .then(() => runInAction(() => {
          this.login = '';
          this.password = '';
          this.loginState = '';
          this.isAuthed = true;
          this.signinModal = false;
        }))
        .catch(() => {
          this.loginState = 'error';
        });
    }
    @action handleLogout = () => {
      getWindow(win => win.localStorage.removeItem('user'));
      this.isAuthed = false;
    }
    @action handleMetamaskAuth = () => new Promise(async (resolve) => {
      const { message } = this;

      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const hash = web3.utils.sha3(message);
          const accounts = await web3.eth.getAccounts();
          const signature = await web3.eth.personal.sign(message, accounts[0], hash);

          return resolve({
            message, hash, signature, wallet: accounts[0], error: ''
          });
        } catch (error) {
          return resolve({ error });
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);

        const hash = web3.utils.sha3(message);
        const accounts = await web3.eth.getAccounts();
        const signature = await web3.eth.personal.sign(message, accounts[0], hash);

        return resolve({
          message, hash, signature, wallet: accounts[0], error: ''
        });
      } else {
        return resolve({ error: 'Non-Ethereum browser detected. You should consider trying MetaMask!' });
      }
    }).then((result) => {
      this.metamaskResult = result;
      getWindow(win => win.localStorage.setItem('user',
        JSON.stringify(Object.assign(JSON.parse(this.isUserExists), { metamask: result }))));
    })
    @action setLogin = (e) => {
      this.login = e.target.value;
    }
    @action setPassword = (e) => {
      this.password = e.target.value;
    }
    @action setMessage = (e) => {
      this.message = e.target.value;
    }
    @action toggleSigninModal = () => {
      this.signinModal = !this.signinModal;
    }

    constructor() {
      if (this.isUserExists) {
        this.isAuthed = true;

        const user = JSON.parse(this.isUserExists);

        if (user.metamask) {
          const { message } = user.metamask;

          this.message = message;
          this.metamaskResult = user.metamask;
        }
      }
    }
}

export default new MyStore();
