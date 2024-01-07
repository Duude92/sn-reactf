import React from 'react'
import { Component } from 'react';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';
import { LoginActions, QueryParameterNames, ApplicationPaths } from './ApiAuthorizationConstants';
// import styles from '../Styles/LoginActions.module.scss'
import { BASE_API_URL, fetchAspData } from '../../App';
import { NavLink, Link } from 'react-router-dom';

import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';

// The main responsibility of this component is to handle the user's login process.
// This is the starting point for the login process. Any component that needs to authenticate
// a user can simply perform a redirect to this component with a returnUrl query parameter and
// let the component perform the login and return back to the return url.


export default class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      message: undefined,
      rememeber: true,
    };
  }

  // componentDidMount() {
  //   const action = this.props.action;
  //   const returnurl = this.getReturnUrl();
  //   switch (action) {
  //     case LoginActions.Login:
  //       // this.login(this.getReturnUrl());
  //       this.login();
  //       break;
  //     case LoginActions.LoginCallback:
  //       this.processLoginCallback();
  //       break;
  //     case LoginActions.LoginFailed:
  //       const params = new URLSearchParams(window.location.search);
  //       const error = params.get(QueryParameterNames.Message);
  //       this.setState({ message: error });
  //       break;
  //     case LoginActions.Profile:
  //       this.redirectToProfile();
  //       break;
  //     case LoginActions.Register:
  //       this.redirectToRegister();
  //       break;
  //     default:
  //       throw new Error(`Invalid action '${action}'`);
  //   }
  // }
  async handleLogin(event) {
    event.preventDefault();
    const { username, password } = document.forms[0];
    let headersvar = {
      'Accept': 'application/json, text/javascript',
      'Content-Type': 'application/json'
    }
    let request = {
      method: "POST",
      headers: headersvar,
      mode: 'cors',
      body: JSON.stringify({
        email: username.value,
        password: password.value
      })
    };

    const result = await authService.signIn({
      email: username.value,
      password: password.value
    });
    if (result === 201) {
      console.log(result);
      window.location.replace('/');
    }
    // fetchAspData('api/auth/login', "POST", JSON.stringify({
    //   email: username.value,
    //   password: password.value
    // })).then(response => console.log(response));


    // fetch(`${BASE_API_URL}api/auth/login`, request).then(response => {
    //   if (response.ok) {
    //     document.cookie = `token=${response.access_token};max-age=604800;`;
    //   }
    //   else {

    //   }
    //   return response;
    // });
  }

  loginPage() {
    return (
      <LoginComponent />
    )
  }
  registerPage() {
    return (<RegistrationComponent />)
  }

  render() {
    const action = this.props.action;
    const { message } = this.state;

    if (!!message) {
      return <div>{message}</div>
    } else {
      switch (action) {
        case LoginActions.Login:
          return (this.loginPage());
        case LoginActions.LoginCallback:
          return (<div>Processing login callback</div>);
        case LoginActions.Profile:
        case LoginActions.Register:
          return (this.registerPage());
        default:
          throw new Error(`Invalid action '${action}'`);
      }
    }
  }

  async login(returnUrl) {
    const state = { returnUrl };
    const result = await authService.signIn(state);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        break;
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(returnUrl);
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(`Invalid status result ${result.status}.`);
    }
  }

  async processLoginCallback() {
    const url = window.location.href;
    const result = await authService.completeSignIn(url);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        // There should not be any redirects as the only time completeSignIn finishes
        // is when we are doing a redirect sign in flow.
        throw new Error('Should not redirect.');
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(this.getReturnUrl(result.state));
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(`Invalid authentication result status '${result.status}'.`);
    }
  }

  getReturnUrl(state) {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
      // This is an extra check to prevent open redirects.
      throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
    }
    return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
  }

  redirectToRegister() {
    this.redirectToApiAuthorizationPath(`${ApplicationPaths.IdentityRegisterPath}?${QueryParameterNames.ReturnUrl}=${encodeURI(ApplicationPaths.Login)}`);
  }

  redirectToProfile() {
    this.redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
  }

  redirectToApiAuthorizationPath(apiAuthorizationPath) {
    const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
    // It's important that we do a replace here so that when the user hits the back arrow on the
    // browser they get sent back to where it was on the app instead of to an endpoint on this
    // component.
    window.location.replace(redirectUrl);
  }

  navigateToReturnUrl(returnUrl) {
    // It's important that we do a replace here so that we remove the callback uri with the
    // fragment containing the tokens from the browser history.
    window.location.replace(returnUrl);
  }
}

