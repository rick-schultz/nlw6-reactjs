import { useParams } from 'react-router-dom'
import LogoImg from '../..//assets/images/logo.svg'
import { Button } from '../../components/Button/Button'
import { Question } from '../../components/Question/Question'
import { RoomCode } from '../../components/RoomCode/RoomCode'
import { useRoom } from '../../hooks/useRoom'

import './adminRoom.styled.scss'

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions} = useRoom(roomId); 

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let me ask" />
          <div>
          <RoomCode code={roomId}/>
          <Button isOutlined>Close Room</Button>
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
              />
              );
            })}
            </div>
        </main>
    </div>
  )
}