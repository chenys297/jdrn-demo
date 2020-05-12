// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import {px2dp} from '../../utils';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.layout}>
          <ScrollView style={styles.content}>
            <View style={styles.header}>Header</View>
            <View style={styles.list}>list</View>
          </ScrollView>
          <View style={styles.tabBar}>TabBar</View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#ffeedd',
  },
  content: {
    display: 'flex',
  },
  header: {
    backgroundColor: 'yellow',
  },
  list: {
    flexGrow: 1,
    backgroundColor: 'pink',
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
  },
});
