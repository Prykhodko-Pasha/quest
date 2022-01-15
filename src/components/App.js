import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './Container/Container';
// import Navigation from './Navigation/Navigation';
import Loader from './Loader/Loader';

// const HomePage = lazy(() =>
//   import('./HomePage/HomePage' /* webpackChunkName: 'home-page' */),
// );
// const MoviesPage = lazy(() =>
//   import('./MoviesPage/MoviesPage' /* webpackChunkName: 'movies-page' */),
// );
const MovieDetailsPage = lazy(() =>
  import(
    './MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: 'movie-details-page' */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    './NotFoundPage/NotFoundPage' /* webpackChunkName: 'not-found-page' */
  ),
);

export default function App() {
  return (
    <Container>
      {/* <Navigation /> */}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            {/* <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId"> */}
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
