import { Navigate, Outlet } from "react-router";

function protectedRouter(){
  const auth = sessionStorage.getItem('login');
  return(
    auth ? <Outlet/> : <Navigate to =''/>
  )
}

export default protectedRouter;