import { useHistory } from 'react-router-dom';

export function useRedirect() {
  const history = useHistory();

  const handleRedirection = (roleId, roleName) => {

    if (roleName === 'admin' || roleId === 'admin_role_id') {
      history.push('/dashboard');
    } else if (roleName === 'user' || roleId === 'user_role_id') {
      history.push('/home');
    } else {
      history.push('/default');
    }
  };

  return handleRedirection;
}
