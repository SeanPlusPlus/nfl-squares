// components
import Header from '../components/header'
import Nav from '../components/nav'

export default function NFT() {
  return (
    <div className="grid-bg min-h-screen">
      <Header />
      <Nav />
      <main className="flex md:mt-12">
        <div className="m-auto">
          NFT
        </div>
      </main>
    </div>
  )
}