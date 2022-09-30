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
            <h1 className="text-5xl font-bold">Menu XYZ</h1>
            <p className="py-6">
              Blockchain powered restaurant menus
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
