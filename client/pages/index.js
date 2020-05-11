import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser);
  return currentUser ? (
    <h1> You are Signed In </h1>
  ) : (
    <h1> You are SignedOut </h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser');

  return data;
};

export default LandingPage;
