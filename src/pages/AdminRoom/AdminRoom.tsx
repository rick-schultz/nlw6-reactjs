import { ref, remove, update } from 'firebase/database'
import { Link, useHistory, useParams } from 'react-router-dom'

import logoImg from '../..//assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

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

async function handleCheckQuestionAsAnswered(questionId: string) {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isAnswered: true,
    });
  }

async function handleHighlightQuestion(questionId: string) {
  await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
    isHighlighted: true,
  });
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
        <Link to="/">
           <img src={logoImg} alt="Let me ask" />
        </Link>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                <>
                <button
                type="button"
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="check question as answered" />
                </button>
                <button
                type="button"
                onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="highlight question" />
                </button>
                </>)}
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remove question" />
                </button>
              </Question>
              );
            })}
            </div>
        </main>
    </div>
  )
}