import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import authService from './components/api-authorization/AuthorizeService';
import { Layout } from './components/Layout';
import './custom.css';

export const BASE_API_URL = 'https://localhost:7216/'
export const fetchAspData = async (path, fetchMethod = 'GET', fetchBody = null, contentType = null) => {
  const token = await authService.getAccessToken();
  const isAuthenticated = await authService.isAuthenticated();
  let headersvar = {
    'Accept': 'application/json, text/javascript',
  }
  headersvar['Content-Type'] = !contentType && 'application/json';
  contentType && delete headersvar['Content-Type'];
  isAuthenticated && (headersvar.Authorization = `Bearer ${token}`);
  let request = {
    method: fetchMethod,
    headers: headersvar,
    mode: 'cors',
  };
  fetchBody && (request.body = fetchBody);
  console.log(request);

  const response = await fetch(BASE_API_URL + path, request);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return await response;
}

export default class App extends Component {

  static displayName = App.name;
  routes = (appRoutes) => {
    return (
      appRoutes.map((route, index) => {
        const { element, requireAuth, child, ...rest } = route;
        return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} >
          {
            child !== undefined && this.routes(child)
          }</Route>;
      })


    )
  }

  render() {
    return (
      <Layout>
        <Routes>
          {/* {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} > {element.child && element.child.map(childElement)}</Route>;
          })} */}
          {
            this.routes(AppRoutes)
          }
        </Routes>
      </Layout>
    );
  }
}
