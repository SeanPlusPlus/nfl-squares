import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const About = () => {
  const {
    // modalAbout
    modalAbout,
    setModalAbout,
  } = useContext(GlobalContext)

  const handleCloseAbout = () => {
    setModalAbout(null)
  }

  if (!modalAbout) {
    return <></>
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleCloseAbout}>✕</label>
        <h3 className="font-bold text-xl flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-1 text-xl mb-4">
            About
          </span>
        </h3>
        <div>
          <p className="pb-4">
            Hello World!
          </p>
        </div>
        <div className="modal-action pt-5">
          <label htmlFor="my-modal" className="btn" onClick={handleCloseAbout}>Close</label>
        </div>
      </div>
    </div>
  )
}

export default About
