import { withRouter } from 'react-router';

const AuthButton = withRouter(({ history }) => {
  const token = sessionStorage.getItem('token');
  return token ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          sessionStorage.removeItem('token');
          return history.push('/');
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
});

export default AuthButton;
