import { observable, action, computed, IReactionDisposer, reaction } from 'mobx';
import { Storage } from 'react-jhipster';
import autobind from 'autobind-decorator';
import client from 'app/shared/api/clientInstance';
import { UserDTO } from 'app/shared/api/generated/API';
import * as _ from 'lodash';
import { AUTHORITIES } from 'app/config/constants';
import { remoteData } from 'cbioportal-frontend-commons';
import { assignPublicToken, getPublicWebsiteToken, getStoredToken } from 'app/indexUtils';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

export const AUTH_UER_TOKEN_KEY = 'oncokb-user-token';
export const AUTH_WEBSITE_TOKEN_KEY = 'oncokb-webiste-token';

class AuthenticationStore {
  @observable loading = false;
  @observable loginSuccess = false;
  @observable loginError = false; // Errors returned from server side
  @observable loginErrorMessage = ''; // Errors returned from server side
  @observable showModalLogin = false;
  @observable errorMessage = ''; // Errors returned from server side
  @observable redirectMessage = '';
  @observable idToken = '';
  @observable logoutUrl = '';
  @observable account: UserDTO | undefined;

  @observable userName = '';
  @observable password = '';

  readonly reactions: IReactionDisposer[] = [];

  constructor() {
    const existedToken = getStoredToken();
    if (existedToken) {
      this.idToken = existedToken;
      if (this.idToken !== getPublicWebsiteToken()) {
        this.getAccount();
      }
    }
  }

  @action
  getAccount() {
    client
      .getAccountUsingGET({})
      .then(account => {
        this.account = account;
      })
      .catch(error => {
        this.updateIdToken('');
      });
  }

  @autobind
  @action
  generateIdToken() {
    return new Promise((resolve, reject) => {
      client
        .changeTokenUsingPOST({})
        .then((newToken: string) => {
          this.updateIdToken(newToken);
          resolve(this.idToken);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  @computed
  get isAuthenticated() {
    return !!this.idToken;
  }

  @computed
  get isUserAuthenticated() {
    return this.isAuthenticated && this.account !== undefined;
  }

  @autobind
  @action
  public login(username: string, password: string) {
    this.loading = true;
    client
      .authorizeUsingPOST({
        loginVm: {
          username,
          password,
          rememberMe: false
        }
      })
      .then(this.loginSuccessCallback, this.loginErrorCallback);
  }

  @action.bound
  loginSuccessCallback(result: string) {
    const uuid = result;
    this.updateIdToken(uuid);
    this.loginSuccess = true;

    // we should fetch the account info when the user is successfully logged in.
    this.getAccount();
    this.loading = false;
  }

  @action
  updateIdToken(newToken: string) {
    Storage.local.set(AUTH_UER_TOKEN_KEY, newToken);
    this.idToken = newToken;
  }

  @action.bound
  loginErrorCallback(error: Error) {
    this.loginError = true;
    this.loginErrorMessage = error.message;
  }

  public clearAuthToken() {
    if (Storage.local.get(AUTH_UER_TOKEN_KEY)) {
      Storage.local.remove(AUTH_UER_TOKEN_KEY);
    }
    if (Storage.session.get(AUTH_UER_TOKEN_KEY)) {
      Storage.session.remove(AUTH_UER_TOKEN_KEY);
    }
  }

  @autobind
  @action
  public logout() {
    // Remove user's token
    this.clearAuthToken();
    // Remove the account info as well
    this.account = undefined;
    // Revert back to public website token
    this.idToken = getPublicWebsiteToken();
  }

  @action
  initialLoginStatus() {
    this.loginSuccess = false;
    this.loginError = false;
    this.loginErrorMessage = '';
  }

  destroy() {
    for (const item of this.reactions) {
      item();
    }
  }
}

export default AuthenticationStore;
