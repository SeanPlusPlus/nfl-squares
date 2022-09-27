import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'

// components
import About from './about'

const Home = () => {
  const [modalAbout, setModalAbout] = useState('')

  const { account, wallet } = useContext(GlobalContext)

  const handleOpenAbout = () => {
    setModalAbout('modal-open')
  }

  const handleCloseAbout = () => {
    setModalAbout('')
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
            <button className="btn btn-primary" onClick={handleOpenAbout}>About</button>
          </div>
        </div>
      </div>

      <div className={`modal ${modalAbout}`}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleCloseAbout}>✕</label>
          <About />
          <div className="modal-action pt-5">
            <label htmlFor="my-modal" className="btn" onClick={handleCloseAbout}>Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
