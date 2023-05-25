// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// class App extends Component {

//   render() {
//     return (
//       <HashRouter>
//           <React.Suspense fallback={loading}>
//             <Switch>
//               <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
//               <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
//               <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
//               <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
//               <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
//             </Switch>
//           </React.Suspense>
//       </HashRouter>
//     );
//   }
// }

// export default App;


import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory, HashRouter } from 'react-router-dom';
// import axios from 'axios';
import { api } from './plugins/api';
import Login from './views/atmaQA/loginForm';
// import Register from './components/Register';
import Dashboard from './views/atmaQA/dashboardAtma';
import './scss/style.scss';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App() {

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loadingUserInformation, setLoadingUserInformation] = useState(true);
  const history = useHistory();

  // console.log(user);

  useEffect(() => {
    // console.log('AHDKALDASLDLJ')
    const token = localStorage.getItem('token');

    if (token) {
      api
        .get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response)
          setUser(response.data);
          // setUser(response.data);
          setAuth(true);
          setLoadingUserInformation(false);
        })
        .catch((error) => {
          console.log(error)
          // localStorage.removeItem('token');
        });
    } else {
      setLoadingUserInformation(false);
    }
  }, []);

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  return (
    <BrowserRouter>
      {loadingUserInformation ?
        loading
        : auth ?
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/dashboard-atma">
                <Dashboard user={user} setAuth={setAuth} />
              </Route>
              <Route path="/" render={props => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
          : <Login />}
    </BrowserRouter>
  );
}

export default App;

