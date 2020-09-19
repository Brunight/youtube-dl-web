import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Info from '../pages/Info';
import TimeSlider from '../pages/Info/TimeSlider';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/info/:source/:id" component={Info} />
  </Switch>
);

export default Routes;
