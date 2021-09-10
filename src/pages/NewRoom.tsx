import { Link } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss'
import {Button} from '../components/Button'

export function NewRoom() {
 return (
  <div id="page-auth">
   <aside>
    <img src={illustrationImg} alt="Illustration of Q&amp;A" />
    <strong>Create Q&amp;A live rooms.</strong>
    <p>Clear all of you audience doubts real-time.</p>
   </aside>
   <main>
    <div className="main-content">
     <img src={logoImg} alt="Letmeask" />
     <h2>Create new room</h2>
     <form>
      <input
      type="text"
      placeholder="Room's name"
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