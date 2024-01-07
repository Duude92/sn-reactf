import React from "react";
import { Button, TextField, withStyles } from "@mui/material";

const styles = {};

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

function RegistrationComponent() {
  const handleRegister = (event) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    let headersvar = {
      Accept: "application/json, text/javascript",
      "Content-Type": "application/json",
    };
  };
  const classes = useStyles;

  return (
    <div className={styles.loginPage}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <TextField
          id="confirm-password"
          label="Confirm Password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Register
        </Button>
      </form>
      {/* <form onSubmit={this.handleRegister}>
          <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" required />

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
            <hr />

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="registerbtn">Register</button>
          </div>

          <div class="container signin">
            <p>Already have an account?
              <NavLink tag={Link} to='/authentication/login' >Sign in</NavLink>.</p>
          </div>
        </form > */}
    </div>
  );
}

export default RegistrationComponent;
