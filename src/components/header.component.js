

import React from 'react';
import { LoginComponent } from './';


class HeaderComponent extends React.PureComponent {

  render() {
    
    return (
      <div id="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between border-bottom shadow-sm">

          <a className="navbar-brand" href="#">Piratefy</a>
          

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

          <LoginComponent className="float-right" loginSuccess={this.props.loginSuccess}/>

        </nav>

      </div>
    );
  }
}

export default HeaderComponent;
