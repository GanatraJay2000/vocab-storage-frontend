import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Vocabulary Storage</a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-0">
                        {/* <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/words">Words</a>
                        </li>                         */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;