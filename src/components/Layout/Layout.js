import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    const newState = !this.state.showSideDrawer;
    this.setState({showSideDrawer: newState})
  }
   
  render () {
    return (
    <Aux>
      <Toolbar toggle={this.sideDrawerToggleHandler}/>
      <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
      <div className={styles.Header}>Sidebar</div>
      <main className={styles.Content}>
        {this.props.children}
      </main>
      </Aux>
    )
  }
};

export default layout;
