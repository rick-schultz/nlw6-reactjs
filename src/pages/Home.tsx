import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import {Button} from '../components/Button'

export function Home() {
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
     <button className="create-room">
      <img src={googleIconImg} alt="" />
      Create room with Google account
     </button>
     <div className="separator">or join a room</div>
     <form>
      <input
      type="text"
      placeholder="Enter room code"
      />
      <Button type="submit">Join room</Button>
     </form>
    </div>
   </main>
  </div>
 )
}