import { Switch, Route } from "react-router-dom";

import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/auth" exact component={AuthPage} />
    </Switch>
  );
};
