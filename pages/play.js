// components
import Header from '../components/header'
import Nav from '../components/nav'
import Board from '../components/board'

export default function App() {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <Nav />
      <main className="flex md:mt-12">
        <div className="m-auto">
          <Board />
        </div>
      </main>
    </div>
  )
}