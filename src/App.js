import LoginForm from "./components/LoginForm";
import {BrowserRouter, Routes, useRoutes, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import NavigationBar from "./components/navigationbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from "./components/UserProfile";
import auth from "./HelperClasses/Auth";
import {useState} from "react";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
    const [isAuth, setIsAuth] = useState(auth.isAuthenticated());
    console.log('App is userData: '+auth.userData)
    return (
        <div>
            <div>
                <NavigationBar
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}/>
                <Routes>
                    <Route element={<ProtectedRoutes
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}/>}>
                        <Route path='/' exact element={<Home/>}/>
                        {/*<Route path='/consoles' element={<Consoles/>}/>*/}
                        <Route path='/profile' element={<UserProfile/>}/>
                    </Route>
                    <Route path='/login' element={<LoginForm isAuth={isAuth}
                                                             setIsAuth={setIsAuth}/>}/>
                    <Route path='/logout'/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

// <Route path="/n">
//     <NewReleases/>
// </Route>

// <ProtectedRoute exact path="/app" component={} />


// <Layout startingTheme="light">
//
//     <LoginForm>
//
//     </LoginForm>
//
//
// </Layout>

// <Router>
//     <Routes>
//         <Route path="/" element={<NavigationBar />}>
//             <Route index element={<Home />} />
//             <Route path="blogs" element={<Consoles />} />
//         </Route>
//     </Routes>
// </Router>
