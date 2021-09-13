import { FormEvent, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import './newRoom.styled.scss'
import {Button} from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth';
import { database, ref } from "../../services/firebase";
import { push } from '@firebase/database';


export function NewRoom() {
const { user } = useAuth();
const history = useHistory();

const [newRoom, setNewRoom] = useState('');

async function handleCreateRoom(event: FormEvent) {
event.preventDefault();

if (newRoom.trim() === '') {
  return;
}

const roomRef = ref(database, 'rooms');

const firebaseRoom = await push(roomRef, {
  title: newRoom,
  authorId: user?.id,
});
history.push(`/rooms/${firebaseRoom.key}`)
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
     <img src={logoImg} alt="Let me ask" />
     <h2>Create new room</h2>
     <form onSubmit={handleCreateRoom}>
      <input
      type="text"
      placeholder="Room's name"
      onChange={event => setNewRoom(event.target.value)}
      value={newRoom}
      />
      <Button type="submit">Create room</Button>
     </form>
     <p>
       Wanna join an existing room? <Link to="/">Click here</Link>
    </p>
    </div>
   </main>
  </div>
 )
}