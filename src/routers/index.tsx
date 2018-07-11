import * as React from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import * as Loadable from 'react-loadable';
const HomeComponent = Loadable({
  loader: () => import('./Home' /* webpackChunkName:"home" */),
  loading() {
    return <div>Loading....</div>;
  },
});
const AboutComponent = Loadable({
  loader: () => import('./About'),
  loading() {
    return <div>Loading....</div>;
  },
});
const ArticleComponent = Loadable({
  loader: () => import('./Article'),
  loading() {
    return <div>Loading....</div>;
  },
});
export class RouterComp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/about" component={AboutComponent}/>
          <Route path="/article" component={ArticleComponent}/>
          <Route component={HomeComponent} />
        </Switch>
      </Router>
    );
  }
}

export const RouterCompnent = hot(module)(RouterComp);