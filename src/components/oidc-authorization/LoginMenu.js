import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Button } from '@mui/material';


const LinkRef = React.forwardRef((props, ref) => <Link ref={ref} {...props} />)


export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = `${ApplicationPaths.LogOut}`;
      const logoutState = { local: true };
      return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {
    return (<Fragment>
      <NavItem>
        <Button component={LinkRef} sx={{ display: 'block' }} to={profilePath}  >Profile</Button>

        {/* <NavLink tag={Link} className="text-dark navlink" to={profilePath}>Profile</NavLink> */}
      </NavItem>
      <NavItem>
        <Button component={LinkRef} sx={{ display: 'block' }} to={logoutPath}  >Logout</Button>

        {/* <NavLink replace tag={Link} className="text-dark navlink" to={logoutPath} state={logoutState}>Logout</NavLink> */}
      </NavItem>
    </Fragment>);
  }

  anonymousView(registerPath, loginPath) {
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark navlink" to={registerPath}>Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-dark navlink" to={loginPath}>Login</NavLink>
      </NavItem>
    </Fragment>);
  }
}
