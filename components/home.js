import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'

// components
import About from './modals/About'

const Home = () => {
  const { setModal } = useContext(GlobalContext)

  const handleOpen= () => {
    setModal({about: 'modal-open'})
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center mb-64">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold pb-6">NFL Squares</h1>
            <p className="py-6">
              A game very similar to Super Bowl Squares, but this one runs for the entire NFL season!!!
            </p>
            <button className="btn btn-primary" onClick={handleOpen}>About</button>
          </div>
        </div>
      </div>
      
      <About />
    </>
  )
}

export default Home
