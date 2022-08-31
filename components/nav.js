import Link from 'next/link'
import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'

// components
import About from './about'

const Nav = () => {
  const [modalAbout, setModalAbout] = useState('')
  const [modalProfile, setModalProfile] = useState('')
  const {
    imx,
    account,
  } = useContext(GlobalContext)

  const handleLogin = () => {
    console.log('login');
  }
  
  const handleOpenProfile = () => {
    setModalProfile('modal-open')
  }

  const handleCloseProfile = () => {
    setModalProfile('')
  }

  const handleOpenAbout = () => {
    setModalAbout('modal-open')
  }

  const handleCloseAbout = () => {
    setModalAbout('')
  }

  return (
    <>
      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/">
            <button className="btn btn-outline normal-case text-xl ml-2">
              <span className="text-slate-300">NFL Squares</span>
            </button>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <button className="mr-2 link link-hover" onClick={handleOpenAbout}>About</button>
          { account ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-outline text-stone-50">
                  {account.name}
                </label>
                <ul tabIndex="0" className="p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                  <li>
                    <button onClick={handleOpenProfile} className="justify-between">
                      Profile
                    </button>
                  </li>
                  <li>
                    <Link href="/">
                      <button className="mr-2 link link-hover" onClick={handleLogin}>Login</button>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button className="mr-2 link link-hover" onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
      </div>

      { account && (
        <div className={`modal ${modalProfile}`}>
          <div className="modal-box">
            <h3 className="font-bold text-xl flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-1 text-xl mb-4">
                Account
              </span>
            </h3>
            <p className="pt-4">
              Public Key:
              <br />
              <code className="font-semibold text-xs">{account.publicKey}</code>
            </p>
            {imx && (
              <>
                <div className="divider" />
                <p className="pt-1">
                  Stark Key:
                  <br />
                  <code className="font-semibold text-xs">{account.imx.starkPublicKey}</code>
                </p>
              </>
            )}
            <div className="modal-action pt-5">
              <label htmlFor="my-modal" className="btn" onClick={handleCloseProfile}>Close</label>
            </div>
          </div>
        </div>
      )}

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

export default Nav 
