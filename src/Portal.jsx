/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const PortalDefaultProps = {
  usePortal: true,
};

class Portal extends Component {
  portalEl;

  static defaultProps = PortalDefaultProps;

  constructor(props) {
    super(props);
    this.portalEl = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.portalEl);
  }
  componentWillUnmount() {
    document.body.removeChild(this.portalEl);
  }

  render() {
    const { children, usePortal } = this.props;
    if (usePortal) {
      return ReactDOM.createPortal(this.props.children, this.portalEl);
    }
    return children;
  }
}

export default Portal;
