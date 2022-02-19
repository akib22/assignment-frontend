import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/user';

export function PrivateRoute({ Component }) {
  const [state] = useUser();

  return state.user ? <Component /> : <Navigate to="/signin" />;
}
