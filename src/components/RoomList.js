import React, {Component} from 'react';

//Create a room list component

  class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
      this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot  => {
            // console.log('Wolf!')
            const room = snapshot.val();
            // console.log(room);
            room.key = snapshot.key;
            // console.log(room.key);
            this.setState({ rooms: this.state.rooms.concat( room ) })
            console.log(this.state.rooms);

          });
          this.roomsRef.on('child_removed', snapshot  => {
            this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
          });
    }

render() {
        return (

            <section className='roomlist'>
            <h1>Bloc Chat</h1>
            <ul>
            {
                this.state.rooms.map((room, index) =>
               <div> Chat {room.name  }</div>
                )

            }
          </ul>
            </section>
        );
    }



}



export default RoomList;
