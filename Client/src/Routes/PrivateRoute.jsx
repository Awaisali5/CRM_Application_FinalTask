import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && (!roles || roles.includes(user.role)) ? (
          <Component {...props} />
        ) : (
          <redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
