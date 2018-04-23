import React, { Component } from "react";

//Create a room list component

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      // console.log('Wolf!')
      const room = snapshot.val();
      // console.log(room);
      room.key = snapshot.key;
      // console.log(room.key);
      this.setState({ rooms: this.state.rooms.concat(room) });
      console.log(this.state.rooms);
    });
    this.roomsRef.on("child_removed", snapshot => {
      this.setState({
        rooms: this.state.rooms.filter(room => room.key !== snapshot.key)
      });
    });
  }
  createRooms(n) {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }
  handleChange(n) {
    this.setState({ newRoomName: n.target.value });
    console.log(n.target.value);
  }

  render() {
    return (
      <section className="roomlist">
        <h1>Bloc Chat</h1>
        <ul>
          {this.state.rooms.map((room, index) => (
            <li key={index}> Chat {room.name}</li>
          ))}
        </ul>
        <form onSubmit={n => this.createRooms(n)}>
          <input
            type="text"
            value={this.state.newRoomName}
            onChange={n => this.handleChange(n)}
          />
          <input type="submit" />
        </form>
      </section>
    );
  }
}

export default RoomList;
