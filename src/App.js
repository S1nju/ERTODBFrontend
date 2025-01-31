import { Route, Routes } from "react-router-dom";
import Login from "./pages/website/auth/login";
import Redirect from "./pages/website/auth/googlecallback";
import Register from "./pages/website/auth/register";
import Home from "./pages/website/main pages/Home";
import './assets/all.min.css'
import Users from "./pages/dashboard/users/users";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/dashboard/dashboard";
import Rauth from "./pages/website/auth/rauth";
import Edituser from "./pages/dashboard/users/edituser";
import Adduser from "./pages/dashboard/users/adduser";
import Err403 from "./pages/website/auth/403";
import Err404 from "./pages/website/auth/404";
import Logincallback from "./pages/website/auth/logincallback";
import Databases from "./pages/dashboard/product/Databases";
import AddDB from "./pages/dashboard/product/addDB";
import Landing from "./pages/website/main pages/Landing";
import { Axios } from "./api/axios";
import Cookie from 'cookie-universal'





function App() {
   const cookie = Cookie()
  Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if ((error.response.status === 401 )&& (cookie.get("token")!=null)) {
      cookie.remove("token"); // Remove the token
      console.log("Token has expired and has been removed.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
  return (
    <div className="App" style={{ height: '100%' , width:"100%" }}>

<Routes>

<Route element={
<Logincallback></Logincallback>}>
<Route path="login" element={
<Login></Login>}></Route>
<Route path="signup" element={
<Register></Register>}></Route></Route>
<Route path="/" element={
  <Landing></Landing>}></Route>

<Route path="/auth/google/callback" element={
<Redirect></Redirect>}></Route>
<Route path="/*" element={
<Err404></Err404>}></Route>
  <Route element={<Rauth allowedRole={[ 'USER', 'ADMIN']}></Rauth>}>
  <Route path="editor/db/:id" element={
  <Home></Home>}></Route></Route>
<Route element={<Rauth allowedRole={[ 'USER', 'ADMIN']}></Rauth>}>
<Route path="dashboard" element={
<Dashboard></Dashboard>}>
<Route path="403" element={
<Err403></Err403>}></Route>
<Route element={<Rauth allowedRole={['USER','ADMIN']}></Rauth>}>
<Route path="dbs" element={
<Databases></Databases>}></Route>
<Route path="newDb" element={
<AddDB></AddDB>}></Route>
</Route>
<Route element={<Rauth allowedRole={['ADMIN']}></Rauth>}>



<Route path="users" element={
<Users></Users>}></Route>
<Route path="user/:id" element={
<Edituser></Edituser>}></Route>
<Route path="user" element={
<Adduser></Adduser>}></Route></Route>




</Route></Route>

</Routes>
    </div>
  );
}

export default App;
