import * as React from 'React';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Login from 'app/components/login/login';
import { Logout } from 'app/components/login/logout';
import { RegisterPage } from 'app/components/account/register';
import { PrivateRoute } from 'app/shared/auth/private-route';
import { AboutPage } from 'app/pages/AboutPage';
import Loadable from 'react-loadable';
import { AUTHORITIES } from 'app/config/constants';
import HomePage from 'app/pages/HomePage';
import DataAccessPage from 'app/pages/DataAccessPage';
import AuthenticationStore from 'app/store/AuthenticationStore';
import { inject } from 'mobx-react';
import { isAuthorized } from 'app/shared/auth/AuthUtils';
import { TermsPage } from 'app/pages/TermsPage';
import { TeamPage } from 'app/pages/TeamPage';
import { NewsPage } from 'app/pages/newsPage/NewsPage';
import CancerGenesPage from 'app/pages/CancerGenesPage';
import ActionableGenesPage from 'app/pages/ActionableGenesPage';
import { RouterStore } from 'mobx-react-router';
import { LevelOfEvidencePage } from 'app/pages/LevelOfEvidencePage';
import GenePage from 'app/pages/genePage/GenePage';

// tslint:disable:space-in-parens
const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/pages/menus/account.tsx'),
  loading: () => <div>loading ...</div>
});

const AppRouts = inject('authenticationStore', 'routing')((props: { authenticationStore?: AuthenticationStore; routing?: RouterStore }) => {
  return (
    <Switch>
      <ErrorBoundaryRoute path="/login" component={Login} />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/register" component={RegisterPage} />
      <ErrorBoundaryRoute path="/dataAccess" component={DataAccessPage} />
      <ErrorBoundaryRoute path="/cancerGenes" component={CancerGenesPage} />
      <ErrorBoundaryRoute path="/actionableGenes" component={ActionableGenesPage} />
      <ErrorBoundaryRoute path="/gene/:hugoSymbol" component={GenePage} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/terms" component={TermsPage} />
      <Route exact path="/team" component={TeamPage} />
      <Route exact path="/news" component={NewsPage} />
      <Route exact path="/levels" component={LevelOfEvidencePage} />
      <PrivateRoute
        path="/account"
        authenticationStore={props.authenticationStore!}
        routing={props.routing!}
        component={Account}
        isAuthorized={
          props.authenticationStore!.account &&
          isAuthorized(props.authenticationStore!.account.authorities, [AUTHORITIES.ADMIN, AUTHORITIES.USER])
        }
      />
    </Switch>
  );
});
export default AppRouts;
