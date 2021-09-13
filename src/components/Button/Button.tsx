import {ButtonHTMLAttributes} from 'react'
import './button.styled.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
  return (
    <button className="button" {...props} />
  )
}