import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import './home.styled.scss'
import {Button} from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database, get, ref } from '../../services/firebase';

export function Home() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

async function handleCreateRoom() {
  if (!user) {
   await signInWithGoogle()
  }
    history.push('/rooms/new');
}

async function handleJoinRoom(event: FormEvent) {
event.preventDefault();
if (roomCode.trim() === '') {
  return;
}
const dbRef = ref(database, `/rooms/${roomCode}`);
const roomRef = await get(dbRef);
if (!roomRef.exists()) {
alert('Room does not exist!');
return;
}
if (roomRef.val().closedAt){
alert('Room already closed!');
return;
}
history.push(`/rooms/${roomCode}`);
}

 return (
  <div id="page-auth">
   <aside>
    <img src={illustrationImg} alt="Illustration of Q&amp;A" />
    <strong>Create Q&amp;A live rooms.</strong>
    <p>Clear all of you audience doubts real-time.</p>
   </aside>
   <main>
    <div className="main-content">
      <Link to="/">
        <img src={logoImg} alt="Let me ask" />
      </Link>
     <button onClick={handleCreateRoom} className="create-room">
      <img src={googleIconImg} alt="" />
      Create room with Google account
     </button>
     <div className="separator">or join a room</div>
     <form onSubmit={handleJoinRoom}>
      <input
      type="text"
      placeholder="Enter room code"
      onChange={event => setRoomCode(event.target.value)}
      value={roomCode}
      />
      <Button type="submit">Join room</Button>
     </form>
    </div>
   </main>
  </div>
 )
}