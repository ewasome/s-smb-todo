import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={["/", "/list/:listId"]} component={Main} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
