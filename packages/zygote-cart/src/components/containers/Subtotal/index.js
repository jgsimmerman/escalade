import React, { Component } from 'react';
import { Subscribe } from 'statable';

import { itemState, cost } from '../../state';
import styles from './styles';

export default class Subtotal extends Component {
  componentDidMount() {
    let total = 0;
    itemState.state.items.forEach(item => {
      total += item.price * item.qty;
    });
    cost.setState({
      subtotal: total
    });
  }

  render() {
    return (
      <Subscribe to={cost}>
        {state => (
          <div className="zygoteSubLine">
            <div className="zygoteSubHead">Subtotal</div>
            <div className="zygoteSubTotal">
              ${state.subtotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
            <style jsx global>
              {styles}
            </style>
          </div>
        )}
      </Subscribe>
    );
  }
}
