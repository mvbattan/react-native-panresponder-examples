import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardInfo from '../CardInfo';

class CardList extends Component {
  static getDerivedStateFromProps(props) {
    const newCards = props.cards.map((card, i) => ({ ...card, scale: 0.7 + i * 0.1, y: i * 25 }));
    newCards[newCards.length - 1].isActive = true;
    return { cards: newCards };
  }

  state = { cards: [] };

  handleDeleteCard = () => {
    const newCards = this.state.cards.slice(0, this.state.cards.length - 1);
    if (!newCards.length) return this.setState(() => ({ cards: [] }));

    newCards[newCards.length - 1].isActive = true;
    return this.setState(() => ({ cards: newCards }));
  };

  render() {
    const { cards } = this.state;
    return cards.map(card => <CardInfo key={card.id} {...card} onDeleteCard={this.handleDeleteCard} />);
  }
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      scale: PropTypes.number,
      y: PropTypes.number
    })
  )
};

export default CardList;
