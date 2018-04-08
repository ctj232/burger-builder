import React, { PureComponent } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends PureComponent {
  // Could also be a simple Component and override shouldComponentUpdate to perform less checks
  render () {
    return (
      <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div className={classes.Modal} style={
        {transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
         opacity: this.props.show ? '1' : '0'}
      }>
        {this.props.children}
      </div>
      </Aux>
    );
  }
}

export default Modal;
