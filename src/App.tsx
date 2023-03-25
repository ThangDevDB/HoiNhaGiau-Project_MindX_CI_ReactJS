// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // const [count, setCount] = useState(0)

  const routeElements = useRouteElement()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
