// components
import Header from '../components/header'
import Nav from '../components/nav'
import Home from '../components/home'

// modal components
import About from '../components/modals/about'

export default function App() {
  return (
    <div className="grid-bg">
      <Header />
      <Nav />
      <Home />

      <About />
    </div>
  )
}