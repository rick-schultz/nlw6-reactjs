import { ref, remove, update } from 'firebase/database'
import { useHistory, useParams } from 'react-router-dom'

import LogoImg from '../..//assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'

import { Button } from '../../components/Button/Button'
import { Question } from '../../components/Question/Question'
import { RoomCode } from '../../components/RoomCode/RoomCode'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'

import './adminRoom.styled.scss'

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions} = useRoom(roomId); 

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      closedAt: new Date()
    })
    history.push('/')
  }

async function handleDeleteQuestion(questionId: string) {
  if (window.confirm('Are you sure you want to delete this question?')) {
    await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
  }
}

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let me ask" />
          <div>
          <RoomCode code={roomId}/>
          <Button
          isOutlined
          onClick={handleEndRoom}
          >Close Room</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room: {title}</h1>
          { questions.length > 0 && <span>{questions.length} Question(s)</span>}
        </div>
          <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              >
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remove" />
                </button>
              </Question>
              );
            })}
            </div>
        </main>
    </div>
  )
}