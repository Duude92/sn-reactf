import React from "react";
import authService from "./AuthorizeService";
import styles from "../Styles/LoginActions.module.scss";

const useStyles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 200,
  // },
  // button: {
  //   margin: theme.spacing(1),
  // },
};

function LoginComponent() {
  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    let headersvar = {
      Accept: "application/json, text/javascript",
      "Content-Type": "application/json",
    };
    let request = {
      method: "POST",
      headers: headersvar,
      mode: "cors",
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    };

    const result = await authService.signIn({
      email: username.value,
      password: password.value,
    });
    if (result === 201) {
      console.log(result);
      window.location.replace("/");
    }
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleLogin}>
        <div className="container">
          <label>Username : </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          <label>Password : </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit">Login</button>
          <input
            type="checkbox"
            checked="checked"
            onChange={(ev) => (this.state.rememeber = ev.target.value)}
          />{" "}
          Remember me Forgot <a href="#"> password? </a>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
