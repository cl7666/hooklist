import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Home from '../views/sandbox/home/Home'
import UserList from '../views/sandbox/user-manage/UserList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import RightList from '../views/sandbox/right-manage/RightList'
import NoPermission from '../views/sandbox/nopermission/NoPermission'

// // RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
// function RequireAuth({ children }) {
//     const authed = localStorage.getItem('token')

//     return authed === 'true' ? ( // 判断 localstorage 中登录状态是否为 true
//         children
//     ) : (
//         <Navigate to="/" replace /> // 跳转到登录
//     );

// }
// function Redirect({ to }) {
//     let navigate = useNavigate();
//     useEffect(() => {
//         navigate(to);
//     });
//     return null;
// }
export default function IndexRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<NewsSandBox />}>
                    <Route path='home' element={<Home />}></Route>
                    <Route path='user-manage/list' element={<UserList />}></Route>
                    <Route path='right-manage/role/list' element={<RoleList />}></Route>
                    <Route path='right-manage/right/list' element={<RightList />}></Route>
                    {/* <Route exact path='/' element={<Redirect to="/home" />}></Route> */}
                    <Route path='/' element={<Navigate to="/home" />}></Route>
                    <Route path='*' element={<NoPermission />} />
                </Route>
                <Route path='login' element={<Login />}></Route>
                {/* <Route path='/' element={
                    <RequireAuth>
                        <NewsSandBox />
                    </RequireAuth>
                }
                ></Route> */}
                {/* <Route path='*' element={
                    <main style={{ padding: "1rem" }}>
                        <p>404!</p>
                    </main>
                }></Route> */}
            </Routes >
        </BrowserRouter >
    )
}