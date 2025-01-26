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
import Writer from "./pages/dashboard/writer pages/writer";
import Err404 from "./pages/website/auth/404";
import Logincallback from "./pages/website/auth/logincallback";
import Products from "./pages/dashboard/product/products";
import Catg from "./pages/dashboard/product/catg/catg";
import Addcat from "./pages/dashboard/product/catg/addcatg";
import Editcatg from "./pages/dashboard/product/catg/editcat";
import Addproduct from "./pages/dashboard/product/addproduct";
import Editproduct from "./pages/dashboard/product/Editproduct";
import Landing from "./pages/website/main pages/Landing";
function App() {
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



  <Route path="/editor/db/:id" element={
  <Home></Home>}></Route></Route>
<Route element={<Rauth allowedRole={[ 'USER', 'ADMIN']}></Rauth>}>



<Route path="/dashboard" element={
<Dashboard></Dashboard>}>
<Route path="403" element={
<Err403></Err403>}></Route>

<Route element={<Rauth allowedRole={['USER','ADMIN']}></Rauth>}>

<Route path="categories" element={
<Catg></Catg>}></Route>
<Route path="categories/:id" element={
<Editcatg></Editcatg>}></Route>

<Route path="newcatg" element={
<Addcat></Addcat>}></Route>


<Route path="dbs" element={
<Products></Products>}></Route>

<Route path="newDb" element={
<Addproduct></Addproduct>}></Route>


<Route path="products/:id" element={
<Editproduct></Editproduct>}></Route>

</Route>
<Route element={<Rauth allowedRole={['ADMIN']}></Rauth>}>



<Route path="users" element={
<Users></Users>}></Route>
<Route path="users/:id" element={
<Edituser></Edituser>}></Route>
<Route path="user" element={
<Adduser></Adduser>}></Route></Route>


<Route element={<Rauth allowedRole={['1996','1995']}></Rauth>}>

<Route path="write" element={
<Writer></Writer>}></Route>





</Route>


</Route></Route>

</Routes>
    </div>
  );
}

export default App;
