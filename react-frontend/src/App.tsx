import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <header>
      <ul className='flex_center'>
        <li><Link to={'rates/USD'}>United States Dollar</Link></li>
        <li><Link to={'rates/AUD'}>Australian Dollar</Link></li>
        <li><Link to={'rates/GBP'}>Great Britain Pound</Link></li>
      </ul>
    </header>
      <Outlet />
    </>
  )
}

export default App
