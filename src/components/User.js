import React, { Component } from "react"; //convert user into a class-based component

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
      } else {
        const anonymous = { displayName: "Guest" };
        this.props.setUser(anonymous);
      }
    });
  }

  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section className="username">
        <button onClick={() => this.signInWithPopup()}>Sign In</button>
        <p>{this.props.user.displayName}</p>
        <button className="Users" onClick={() => this.signOut()}>
          Sign Out
        </button>
      </section>
    );
  }
}

export default User;
