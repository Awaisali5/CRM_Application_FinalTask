import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from '../src/Pages/ErrorPage.jsx'
import HomePage from './Pages/HomePage.jsx';
import Layout from './Components/Layout.jsx'
import Dashboard from './Components/Dashboard.jsx';
// import { AuthProvider } from './Context/AuthContext';
// import PrivateRoute from './Routes/PrivateRoute';
// import Dashboard from './Components/Dashboard';
// import CustomerList from './Components/CustomerList';
// import LeadManagement from './Components/LeadManagement';
// import Login from './Pages/Login';
// import HomePage from './Pages/HomePage'

// function App() {
//   return (
    
//     <AuthProvider>
//       <Router>
//         <Switch>
//           <Route path="/login" component={Login} />
//           <PrivateRoute path="/dashboard" component={Dashboard} />
//           <PrivateRoute path="/customers" component={CustomerList} roles={['Admin', 'Manager']} />
//           <PrivateRoute path="/leads" component={LeadManagement} roles={['Sales-Representative']} />
//           <Route path="/" component={Dashboard} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// }

// router
const router = createBrowserRouter([
  {
    path: "/",
    element:  <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "mydashboard/:id",
        element: <Dashboard />,
      },
      
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<RouterProvider router={router}>
      <App />
    </RouterProvider>
    
  </React.StrictMode>,
)
