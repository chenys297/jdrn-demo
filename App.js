import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
  }

  _getFloorData = () => {
    return {};
  };

  render() {
    return (
      <>
        <View>
          <Text>页面编写中。。。</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bgImg: {
    height: '200px',
    backgroundColor: 'yellow',
  },
  cliperContainer: {
    backgroundColor: 'green',
  },
  cliper: {
    backgroundColor: 'pink',
  },
  gift: {
    backgroundColor: 'blue',
  },
  sku: {
    backgroundColor: 'red',
  },
  arrowRight: {
    backgroundColor: 'coral',
  },
  arrowLeft: {
    backgroundColor: 'coral',
  },
  moreInfo: {
    backgroundColor: 'cyan',
  },
});

export default App;
