import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card } from '../utils/common';
import ImageUtil from '../utils/ImageUtil';
import { dateUtil } from '../utils/DateUtil';


class LaunchListItem extends Component {
  onLaunchPress() {
    Actions.launchDetail({ launch: this.props.item });
  }

  render() {
    const { item } = this.props;
    const imageURL = ImageUtil.organizeImageURL(item.rocket);
    const launchTime = dateUtil.organizeLaunchTime(item.windowstart);
    return (
      <TouchableOpacity onPress={this.onLaunchPress.bind(this)}>
        <Card style={{ backgroundColor: '#fff' }}>
          <View style={styles.contentStyle}>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.imageStyle}
                source={{ uri: `${imageURL}` }}
              />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.descView}>
              <View>
                <Text>{launchTime}</Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  contentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: 200,
    flex: 3,
    width: null,
    alignItems: 'stretch'
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  titleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  descView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 5
  },
  title: {
    flex: 0.2,
    fontWeight: 'bold'
  }
};

export default LaunchListItem;
