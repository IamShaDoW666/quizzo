import React from 'react'
import { ToggleDarkMode } from './toggleDarkMode';

const navBar = () => {
  return (
    <nav className='sticky top-0 px-24 py-4 backdrop-blur flex justify-between'>
        <h1>Quizzo</h1>
        <ToggleDarkMode />
    </nav>
  )
}

export default navBar;