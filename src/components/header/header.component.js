

import React from 'react';
import { LoginComponent } from '../';


class HeaderComponent extends React.Component {

  render() {
    
    return (
      <div id="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between border-bottom shadow-sm">

          <a className="navbar-brand" href="#">Piratefy</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <form className="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input type="search" className="form-control " ref={(input) => this.searchText = input} placeholder="Ex. Anitta" />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>

          <LoginComponent />

        </nav>

      </div>
    );
  }
}

export default HeaderComponent;
