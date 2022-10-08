import { Redirect, Route } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export default function PublicRoute({ component: Component, ...rest }) {
  const { isAuthenticate } = useAuth();

  return !isAuthenticate() ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/" />
  );
}