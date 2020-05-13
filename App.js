import React, {Component} from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

const isApp = Platform.OS == 'android' || Platform.OS == 'ios' ? true : false;
const getRpx = size => {
  if (!isApp) {
    return size;
  }
  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const floorWidth = windowWidth - 24;
  const scale = floorWidth / 375;
  const rpx = Number(size) * scale;
  return PixelRatio.roundToNearestPixel(rpx);
};

class App extends Component {
  constructor(props) {
    super(props);
    const {cliperDesc, giftDesc, more1Desc} = this._getFloorData();

    this.state = {
      clickType: '',
      cliperConatinerLeft: new Animated.Value(getRpx(cliperDesc[2])),
      giftTop: new Animated.Value(getRpx(giftDesc[2])),
      moreWidth: new Animated.Value(getRpx(0)),
      moreLeft: new Animated.Value(
        getRpx(-Number(more1Desc[0]) + Number(giftDesc[1])),
      ),
      showFrontGift: false,
      showMore: false,
    };
  }

  onPress = type => {
    this.setState({
      clickType: type,
    });
  };

  _getFloorData = () => {
    return {
      bgImg: {
        imageUrl: require('./assets/bg.png'),
        imageWidth: '375',
        imageHeight: '600',
      },
      preImage: {
        imageUrl: require('./assets/pre.png'),
        imageWidth: '50',
        imageHeight: '65',
      },
      preImageDesc: ['10', '330', '30'],
      nextImage: {
        imageUrl: require('./assets/next.png'),
        imageWidth: '50',
        imageHeight: '65',
      },
      nextImageDesc: ['10', '330', '30'],
      cliperImage: {
        imageUrl: require('./assets/cliper.png'),
        imageWidth: '375',
        imageHeight: '375',
      },
      cliperDesc: ['150', '60', '170', '260', '2000'],
      giftImage: {
        imageUrl: require('./assets/gift.png'),
        imageWidth: '375',
        imageHeight: '375',
      },
      giftDesc: ['150', '60', '210', '500', '2000'],
      sku1Image: {
        imageUrl: require('./assets/sku.png'),
        imageWidth: '300',
        imageHeight: '350',
      },
      sku1Desc: ['40', '210', '20'],
      more1Image: {
        imageUrl: require('./assets/more_info.png'),
        imageWidth: '265',
        imageHeight: '50',
      },
      more1Desc: ['260', '510', '240', '3000'],
    };
  };

  componentDidMount() {
    const {cliperDesc, giftDesc, more1Desc} = this._getFloorData();
    Animated.sequence([
      //夹子和礼物一起向右滑动
      Animated.parallel([
        Animated.timing(this.state.cliperConatinerLeft, {
          toValue: getRpx(cliperDesc[3]),
          duration: Number(cliperDesc[4]),
          easing: Easing.linear,
        }).start(() => {
          this.setState({
            showFrontGift: true,
          });
        }),
      ]),
      //礼物向下掉落
      Animated.timing(this.state.giftTop, {
        toValue: getRpx(giftDesc[3]),
        duration: Number(giftDesc[4]),
        easing: Easing.linear,
        delay: Number(cliperDesc[4]),
      }).start(() => {
        this.setState({
          showMore: true,
        });
      }),
      // 礼物描述右下划出
      Animated.timing(this.state.moreLeft, {
        toValue: getRpx(0),
        duration: Number(more1Desc[3]),
        easing: Easing.linear,
        delay: Number(cliperDesc[4]) + Number(giftDesc[4]),
      }).start(),
    ]);
  }

  /**
   * 根据比例设置图片高度
   *
   * @memberof Banner
   */
  _getImgHeight = (showWidth, imgWidth, imgHeight) => {
    let scaleRatio = Number(showWidth) / imgWidth;
    return getRpx(scaleRatio * imgHeight);
  };

  _renderFrontGift = () => {
    const {giftImage, giftDesc} = this._getFloorData();
    return (
      <>
        <Animated.View
          style={{
            ...styles.gift,
            position: 'absolute',
            width: getRpx(giftDesc[1]),
            height: this._getImgHeight(
              giftDesc[1],
              giftImage.imageWidth,
              giftImage.imageHeight,
            ),
            left: this.state.cliperConatinerLeft,
            top: this.state.giftTop,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={giftImage.imageUrl}
          />
        </Animated.View>
      </>
    );
  };

  _renderCliperAndGift = () => {
    const {cliperImage, cliperDesc, giftImage, giftDesc} = this._getFloorData();
    return (
      <>
        <Animated.View
          style={{
            ...styles.cliper,
            width: getRpx(cliperDesc[1]),
            height: this._getImgHeight(
              cliperDesc[1],
              cliperImage.imageWidth,
              cliperImage.imageHeight,
            ),
            position: 'absolute',
            top: getRpx(cliperDesc[0]),
            left: this.state.cliperConatinerLeft,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={cliperImage.imageUrl}
          />
        </Animated.View>
        <Animated.View
          style={{
            ...styles.gift,
            position: 'absolute',
            width: getRpx(giftDesc[1]),
            height: this._getImgHeight(
              giftDesc[1],
              giftImage.imageWidth,
              giftImage.imageHeight,
            ),
            left: this.state.cliperConatinerLeft,
            top: this.state.giftTop,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={giftImage.imageUrl}
          />
        </Animated.View>
      </>
    );
  };

  _renderArrowLeft = () => {
    try {
      const {preImage, preImageDesc} = this._getFloorData();
      return (
        <View
          style={{
            ...styles.arrowLeft,
            position: 'absolute',
            height: this._getImgHeight(
              preImageDesc[2],
              preImage.imageWidth,
              preImage.imageHeight,
            ),
            width: getRpx(preImageDesc[2]),
            left: getRpx(preImageDesc[0]),
            top: getRpx(preImageDesc[1]),
          }}>
          <TouchableOpacity
            onPress={() => {
              this.onPress('preImage');
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={preImage.imageUrl}
            />
          </TouchableOpacity>
        </View>
      );
    } catch (e) {
      return (
        <View>
          <Text>{JSON.stringify(e)}</Text>
        </View>
      );
    }
  };

  _renderSku = () => {
    const {sku1Image, sku1Desc} = this._getFloorData();
    return (
      <View
        style={{
          ...styles.sku,
          position: 'absolute',
          width: getRpx(sku1Image.imageWidth),
          height: getRpx(sku1Image.imageHeight),
          left: getRpx(sku1Desc[0]),
          top: getRpx(sku1Desc[1]),
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={sku1Image.imageUrl}
        />
      </View>
    );
  };

  _renderArrowRight = () => {
    const {nextImage, nextImageDesc} = this._getFloorData();

    return (
      <View
        style={{
          ...styles.arrowLeft,
          position: 'absolute',
          height: this._getImgHeight(
            nextImageDesc[2],
            nextImage.imageWidth,
            nextImage.imageHeight,
          ),
          width: getRpx(nextImageDesc[2]),
          right: getRpx(nextImageDesc[0]),
          top: getRpx(nextImageDesc[1]),
        }}>
        <TouchableOpacity
          onPress={() => {
            this.onPress('nextImage');
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={nextImage.imageUrl}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderMore = () => {
    const {more1Desc, more1Image, giftImage, giftDesc} = this._getFloorData();
    let scaleRatio = Number(more1Desc[2]) / more1Image.imageWidth;
    const borderRadio = (scaleRatio * Number(more1Image.imageHeight)) / 2;

    return (
      <>
        <View
          style={{
            ...styles.moreInfo,
            position: 'absolute',
            width: getRpx(Number(more1Desc[2]) + Number(giftDesc[1])),
            height: this._getImgHeight(
              Number(more1Desc[2]) + Number(giftDesc[1]),
              Number(more1Image.imageWidth) + Number(giftImage.imageWidth),
              Number(more1Image.imageHeight) + Number(giftImage.imageHeight),
            ),
            left: getRpx(more1Desc[0]),
            top: getRpx(more1Desc[1]),
            borderTopLeftRadius: getRpx(borderRadio),
            borderBottomLeftRadius: getRpx(borderRadio),
            overflow: 'hidden',
          }}>
          <Animated.View
            style={{
              width: getRpx(Number(more1Desc[2]) + Number(giftDesc[1])),
              height: this._getImgHeight(
                Number(more1Desc[2]) + Number(giftDesc[1]),
                Number(more1Image.imageWidth) + Number(giftImage.imageWidth),
                Number(more1Image.imageHeight) + Number(giftImage.imageHeight),
              ),
              marginLeft: this.state.moreLeft,
            }}>
            <View
              style={{
                ...styles.moreAndGift,
                width: getRpx(more1Desc[2]),
                height: this._getImgHeight(
                  more1Desc[2],
                  more1Image.imageWidth,
                  more1Image.imageHeight,
                ),
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={more1Image.imageUrl}
              />
              <Image
                style={{
                  width: getRpx(giftDesc[1]),
                  height: this._getImgHeight(
                    giftDesc[1],
                    giftImage.imageWidth,
                    giftImage.imageHeight,
                  ),
                }}
                source={giftImage.imageUrl}
              />
            </View>
          </Animated.View>
        </View>
      </>
    );
  };

  _renderItem = item => {
    return (
      <>
        {this._renderCliperAndGift()}
        {this._renderArrowLeft()}
        {this._renderSku()}
        {this.state.showFrontGift &&
          !this.state.showMore &&
          this._renderFrontGift()}
        {this.state.showMore && this._renderMore()}
        {this._renderArrowRight()}
      </>
    );
  };

  render() {
    const {bgImg} = this._getFloorData();
    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              ...styles.bgImg,
              position: 'relative',
              height: getRpx(bgImg.imageHeight),
              width: getRpx(bgImg.imageWidth),
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={bgImg.imageUrl}
            />
            {this._renderItem()}
          </View>
          <Text>{this.state.clickType}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImg: {
    backgroundColor: 'yellow',
  },
  cliperContainer: {
    // backgroundColor: 'green',
  },
  cliper: {
    // backgroundColor: 'pink',
  },
  gift: {
    // backgroundColor: 'blue',
  },
  sku: {
    // backgroundColor: 'red',
  },
  arrowRight: {
    // backgroundColor: 'coral',
  },
  arrowLeft: {
    // backgroundColor: 'coral',
  },
  moreInfo: {
    // backgroundColor: 'blue',
  },
  moreAndGift: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default App;
