import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {
    const authToken = {token : document.cookie}
  return (
    authToken.token ? <Outlet/> : <Navigate to={"/login  "}/>
  )
}

export default AuthRoutes