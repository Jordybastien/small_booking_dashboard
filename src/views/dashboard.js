import React, { Component } from 'react';
import '../dashboard.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faCaretDown,
  faSignOutAlt,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import DashboardRouting from '../router/dashboardRoutes';
import { AllRoutes, AllRoles } from '../utils/constants';
// import { logoutUser } from '../actions/authedUser';
// import { tokenKey } from '../services/auth';

const SubMenu = Menu.SubMenu;

class Dashboard extends Component {
  state = {
    showSideBar: false,
    activeRoute: 'dashboard',
    showChildren: false,
  };

  handleLogoutUser = () => {
    // localStorage.removeItem(tokenKey);
    // this.props.dispatch(logoutUser());
    // this.props.history.push('/');
  };

  render() {
    document.title = 'Dashboard';

    const { showSideBar, showChildren } = this.state;
    const { authedUser } = this.props;

    return (
      <div className="grid-container">
        <div className="top-nav-container-responsive">
          <div
            className="menu-icon pt-4"
            onClick={() => this.setState({ showSideBar: true })}
          >
            <FontAwesomeIcon icon={faBars} size="2x" color="#3cb3e0" />
          </div>

          <header className="header header-responsive">
            <div className="header__element br-right pr-3">
              {/* <FontAwesomeIcon icon={faBell} size="2x" color="#42495b" /> */}
            </div>
            <div className="header__element">
              <Menu mode="horizontal" className="home-menu">
                <SubMenu
                  title={
                    <>
                      <div className="user-avatar-container">
                        <div className="avatar-container">
                          {/* <img
                            src={require('../assets/main-logo.png')}
                            className="user-avatar"
                            alt="avatar"
                          /> */}
                          <span className="override-menu-dashboard mr-2">
                            {`${authedUser.stdFname} ${authedUser.stdLname}`}
                          </span>
                        </div>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          size="1x"
                          color="#42495b"
                        />
                      </div>
                    </>
                  }
                  className="main-color override-menu-item-dashboard"
                >
                  <Menu.Item key="setting:2">
                    <button
                      className="no-anchor-decoration main-color override-menu logout-btn"
                      onClick={this.handleLogoutUser}
                    >
                      Logout
                    </button>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </header>
        </div>

        <aside className={`sidenav ${showSideBar && `active`}`}>
          <div
            className="sidenav__close-icon"
            onClick={() => this.setState({ showSideBar: false })}
          >
            <FontAwesomeIcon icon={faTimes} size="sm" color="#3CC6BC" />
          </div>
          <div className="sidenav-container">
            <div className="dashboard-logo-container pl-4">
              <img
                src={require('../assets/main-logo.png')}
                className="dashboard-logo show-cursor mb-5"
                alt="Church Service"
                onClick={() => this.props.history.push('/')}
              />
            </div>
            <ul className="sidenav__list">
              {/* Beginnig*/}
              {authedUser.type === AllRoles.admin &&
                AllRoutes.map(
                  ({ activeRoute, icon, label, goTo, children }) => (
                    <li className="sidenav__list-item" key={activeRoute}>
                      <NavLink
                        to={!children && goTo}
                        className="secondary-color"
                      >
                        <div
                          className={
                            this.state.activeRoute === activeRoute
                              ? 'activeRoute'
                              : 'sidebar-content'
                          }
                          onClick={() => {
                            !children &&
                              this.setState({
                                activeRoute,
                                showSideBar: false,
                              });
                            children &&
                              this.setState({
                                showChildren: !showChildren,
                              });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={icon}
                            size="2x"
                            color="#42495b"
                            className={
                              this.state.activeRoute === activeRoute
                                ? 'activeColor'
                                : 'sidebar-content-icon'
                            }
                          />
                          <span className="h6 mx-3">{label}</span>
                          {children && (
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              size="1x"
                              color="#42495b"
                              className={`children-carret ${
                                this.state.activeRoute === activeRoute
                                  ? 'activeColor'
                                  : 'sidebar-content-icon'
                              }
                              ${
                                showChildren
                                  ? 'show-children-carret'
                                  : 'hide-children-carret'
                              }
                              `}
                            />
                          )}
                        </div>
                      </NavLink>
                      {children && (
                        <ul
                          className={`sidenav__list pl-5 sidenav-list-children ${
                            showChildren
                              ? 'show-sidenav-list-children'
                              : 'hide-sidenav-list-children'
                          }`}
                        >
                          {children.map(
                            ({ activeRoute, icon, label, goTo }) => (
                              <li
                                className="sidenav__list-item"
                                key={activeRoute}
                              >
                                <NavLink to={goTo} className="secondary-color">
                                  <div
                                    className={
                                      this.state.activeRoute === activeRoute
                                        ? 'activeRoute'
                                        : 'sidebar-content'
                                    }
                                    onClick={() =>
                                      this.setState({
                                        activeRoute,
                                        showSideBar: false,
                                      })
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={icon}
                                      size="2x"
                                      color="#42495b"
                                      className={
                                        this.state.activeRoute === activeRoute
                                          ? 'activeColor'
                                          : 'sidebar-content-icon'
                                      }
                                    />
                                    <span className="h6 ml-3">{label}</span>
                                  </div>
                                </NavLink>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  )
                )}
              {/* End */}
            </ul>
            <div className="dashboard-logout-container br-top pt-4">
              <div
                className="sidebar-content show-cursor"
                onClick={this.handleLogoutUser}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  size="2x"
                  color="#42495b"
                  className="sidebar-content-icon logout-icon"
                />
                <span className="h6 ml-3">Logout</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <DashboardRouting />
        </main>

        <footer className="footer dashboard-footer">
          <div className="footer__signature">
            <span className="h6 secondary-color">
              COPYRIGHT {new Date().getFullYear()}{' '}
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    //   TODO: Remove this
    authedUser: { stdFname: 'Test', stdLname: 'App', type: 'admin' },
  };
};

export default connect(mapStateToProps)(Dashboard);
