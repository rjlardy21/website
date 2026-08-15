import React from 'react';
import { NavLink } from 'react-router-dom';

function Navitem({ item, tolink, icon, exact }) {
    return (
        <li>
            <NavLink to={tolink} exact={exact} activeClassName="active">
                <i className={icon}></i>
                <span>{item}</span>
            </NavLink>
        </li>
    );
}

export default Navitem;
