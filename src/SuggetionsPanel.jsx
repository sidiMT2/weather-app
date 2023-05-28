import { useEffect, useState } from "react"

export default function SuggetionsPanel({ suggetions, setSearchText, inputRef }) {

  const [focusLi, setFocusLi] = useState(0)

  let className = suggetions.length > 0 ? 'suggetions-div' : 'd-none'


  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setSearchText(e.target.firstElementChild.innerText)
      inputRef.current.focus()
      console.dir(inputRef.current.parentNode)
      // inputRef.current.parentNode.submit()

    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        if (focusLi < suggetions.length) {
          setFocusLi(focusLi + 1)
        }
      }

      if (e.key === 'ArrowUp') {
        if (focusLi > 0) {
          setFocusLi(focusLi - 1)
        }
        if (focusLi === 0) {
          inputRef.current.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [focusLi, suggetions.length])


  useEffect(() => {
    if (focusLi > 0) {
      document.querySelector('.suggetions-div ul li:nth-child(' + focusLi + ')').focus()
    }
  }, [focusLi])


  return (
    <div className={className} >
      <ul >
        {suggetions.map((suggetion, index) => {
          return <li onKeyDown={handleEnter} tabIndex={index + 1} key={index}><span> {suggetion.name}</span> - {suggetion.country}</li>
        })}
      </ul>
    </div>
  )
}
