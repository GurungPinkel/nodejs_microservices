import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      {/* <h1> { currentUser.email} </h1> */}
      <Component {...pageProps} />
    </div>
  )
}


AppComponent.getInitialProps = async (appContext) => {  
  const { data } = await buildClient(appContext.ctx)
    .get("/api/users/currentuser");

  // need this if we want other getInitialProps method to execute
  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data
  }
}

export default AppComponent;