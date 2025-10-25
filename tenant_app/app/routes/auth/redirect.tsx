import { getAuth0Client } from "lib/auth0";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

type LoginState = 'pending' | 'error' | 'done';

export default function Redirect() {
  const [state, setState] = useState<LoginState>('pending');
  
  useEffect(() => {
    localStorage.removeItem('account');
    if (state !== 'pending') {
      return;
    }
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      getAuth0Client()
        .then(auth0 => auth0.handleRedirectCallback())
        .then(result => {
          setState('done');
        })
        .catch(e => {
          console.error(e);
          setState('error');
        });
    } else {
      setState('error');
    }
  }, []);

  if (state === 'error') {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <h1>There was an error logging you in...</h1>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <h1>Logging you in...</h1>
    </div>
  );
}