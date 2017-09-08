import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  PanResponder,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onLongPress={this.props.onPress}>
        <View
          {...this.props.pan}
          style={[styles.itemContainer, { backgroundColor: getBgColor() }, {...this.props.style}]} />
      </TouchableWithoutFeedback>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.panresponder = null;
    this.activeItem = null;
    /**
     * blockPositions: Array of {
     *  currentPosition: Animated.ValueXY(position),
     *  origin: position
     * }
     */
    this.state = {
      blockPositions: []
    };
  }

  _getBlock = key => this.state.blockPositions[key];

  _getItemStyle = (key) => {
    const pos = this._getBlock(key);
    return {
      top: pos && pos.currentPosition ? pos.currentPosition.getLayout().top : 0,
      left: pos && pos.currentPosition ? pos.currentPosition.getLayout().left : 0
    }
  }

  onItemMove = (e, gesture) => {
    console.log(gesture.dx, gesture.moveX)
  }

  getActiveItem = () => {
    return this.state.blockPositions[this.activeItem];
  }

  activateItem = key = () => {
    this.activeItem = key
  }

  componentWillMount() {
    this.panresponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => console.log('>>>', e, gesture),
      onPanResponderMove: this.onItemMove,
      onPanResponderRelease: (e, gesture) => console.log('release')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}]}
          renderItem={({item, index}) => (
            <ListItem 
              key={index}
              pan={this.panresponder.panHandlers}
              style={this._getItemStyle(index)}
              onPress={this.activateItem(index)}
              />
          )}
        />
      </View>
    );
  }
}

const getBgColor = () => {
  return `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255}, .75)`;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    width: 300,
    marginBottom: 10,
    height: 50
  },
});