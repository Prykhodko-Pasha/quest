import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={s.nav}>
      <NavLink
        to="/"
        exact
        className={s.nav__link}
        activeClassName={s.nav__link_active}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={s.nav__link}
        activeClassName={s.nav__link_active}
      >
        Movies
      </NavLink>
    </nav>
  );
}
