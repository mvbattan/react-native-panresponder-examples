import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import CardInfo from '../CardInfo';

class CardList extends Component {
  static getDerivedStateFromProps(props) {
    const newCards = props.cards.map((card, i) => ({
      ...card,
      scaleValue: new Animated.Value(0.7 + i * 0.1),
      initialValue: new Animated.Value(i * 25)
    }));
    newCards[newCards.length - 1].isActive = true;
    return { cards: newCards };
  }

  state = { cards: [] };

  handleDeleteCard = () => {
    const newCards = this.state.cards.slice(0, this.state.cards.length - 1);
    if (!newCards.length) return this.setState(() => ({ cards: [] }));

    newCards[newCards.length - 1].isActive = true;
    return this.setState(
      () => ({ cards: newCards }),
      () =>
        Animated.parallel(
          this.state.cards
            .map(card =>
              Animated.timing(card.initialValue, {
                toValue: card.initialValue._value + 25,
                useNativeEventDriver: true
              })
            )
            .concat(
              this.state.cards.map(card =>
                Animated.spring(card.scaleValue, {
                  toValue: card.scaleValue._value + 0.1,
                  useNativeEventDriver: true
                })
              )
            )
        ).start()
    );
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
