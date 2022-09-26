import React from 'react'
import Main from './components/Main'
import "./VideoEditor.css"

function VideoEditor() {
  return (
    <div className='videoEditor'>
        {/* Header */}
        <div className='header'>
            <h1> Video Editor</h1>
        </div>
        {/* main */}
        <Main />
            {/* SideBar */}
            {/* displaySection */}
    </div>
  )
}

export default VideoEditor