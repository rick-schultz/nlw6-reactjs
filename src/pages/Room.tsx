import { push } from 'firebase/database'
import { FormEvent } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import LogoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database, ref } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  id: string,
}

export function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('You must be logged in.');
    }
    const question = {
      content: newQuestion,
      author : {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted : false,
      isAnswered : false
    };
    await push(ref(database, `rooms/${roomId}/questions`), question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let me ask" />
          <RoomCode code={roomId}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>React Room</h1>
          <span>4 Questions</span>
        </div>
          <form onSubmit={handleSendQuestion}>
            <textarea
            placeholder="What do you wanna ask?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
            />
            <div className="form-footer">
              {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
              ) : (
              <span><button>Login</button> to send a question.</span>
              )}
              <Button type="submit" disabled={!user}>Send Question</Button>
            </div>
          </form>
        </main>
    </div>
  )
}