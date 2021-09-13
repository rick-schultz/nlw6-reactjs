import { push } from 'firebase/database'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import LogoImg from '../..//assets/images/logo.svg'
import { Button } from '../../components/Button/Button'
import { Question } from '../../components/Question/Question'
import { RoomCode } from '../../components/RoomCode/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database, ref } from '../../services/firebase'

import './room.styled.scss'

type RoomParams = {
  id: string,
}

export function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions} = useRoom(roomId); 

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
          <h1>Room: {title}</h1>
          { questions.length > 0 && <span>{questions.length} Question(s)</span>}
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
          <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              />
              );
            })}
            </div>
        </main>
    </div>
  )
}