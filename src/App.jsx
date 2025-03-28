import React from 'react'
import Home from './pages/Home'
import { NextSeo } from 'next-seo';

function App() {
  return (
    <>
     <NextSeo
        title="TaskMate - Smart Task Manager"
        description="Organize and complete daily tasks with AI-powered task management."
      />
    <Home />
    </>
  )
}

export default App