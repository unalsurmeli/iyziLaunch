import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';

import { dateUtil } from '../utils/DateUtil';
import ImageUtil from '../utils/ImageUtil';
import launchStatus from '../services/launchStatus';
import {
  addThisLaunchToMyFavorites,
  cheksExistsThisLaunchToMyFavorites
} from '../utils/actions';
import { InfoText, CardSection, SView } from '../utils/common';

class LaunchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'information', title: 'Information' },
        { key: 'missions', title: 'Missions' },
        { key: 'images', title: 'Images' }
      ],
      launch: this.props.launch,
      statusDescriptions: null
    };
    this.getLaunchStatus();
    this.cheksExistsThisLaunchToMyFavorites();
  }

  componentWillMount() {
    this.props.navigation.setParams({
      title: this.state.launch.name,
      onRight: () => this.addThisLaunchToMyFavorites()
    });
  }

  async getLaunchStatus() {
    const response = await launchStatus.get(`/${this.state.launch.status}`);
    const statusDescriptions = response.data.types;
    this.setState({ statusDescriptions });
  }

  addThisLaunchToMyFavorites() {
    const { id, name } = this.state.launch;
    console.log(id);
    this.props.addThisLaunchToMyFavorites({ id, name });
  }

  cheksExistsThisLaunchToMyFavorites() {
    const { id, name } = this.state.launch;
    this.props.cheksExistsThisLaunchToMyFavorites({ id, name });
  }

  firstRoute() {
    const launchTime = dateUtil.organizeLaunchTime(
      this.state.launch.windowstart
    );
    return (
      <SView>
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="Launch ID" />
            <Text style={styles.labelStyle}>{this.state.launch.id}</Text>
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="HashTag" />
            <Text style={styles.labelStyle}>{this.state.launch.hashtag}</Text>
          </CardSection>
          {this.renderStatusDescription()}
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="Launch Time" />
            <Text style={styles.labelStyle}>{launchTime}</Text>
          </CardSection>
        </View>
      </SView>
    );
  }

  secondRoute() {
    if (!this.state.launch.missions.length > 0) {
      return;
    }

    return this.state.launch.missions.map(mission => (
      <SView>
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="Mission Name" />
            <Text style={styles.labelStyle}>{mission.name}</Text>
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="Mission Type" />
            <Text style={styles.labelStyle}>{mission.typeName}</Text>
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
            <InfoText text="Mission Description" />
            <Text style={styles.labelStyle}>{mission.description}</Text>
          </CardSection>
        </View>
      </SView>
    ));
  }

  thirdRoute() {
    const imageURL = ImageUtil.organizeImageURL(this.state.launch.rocket);
    return (
      <SView>
        <View
          style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}
        >
          <Image
            style={styles.imagesStyle}
            source={{ uri: `${imageURL}` }}
            resizeMode="contain"
          />
        </View>
      </SView>
    );
  }

  renderScene() {
    switch (this.state.index) {
      case 0:
        return this.firstRoute();
      case 1:
        return this.secondRoute();
      case 2:
        return this.thirdRoute();
      default:
        return (
          <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
            <Text>NULL</Text>
          </View>
        );
    }
  }

  renderTabBar(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#ddd' }}
        style={{ backgroundColor: '#cc3641' }}
      />
    );
  }

  renderStatusDescription() {
    if (!this.state.statusDescriptions) {
      return (
        <CardSection style={{ flexDirection: 'column' }}>
          <InfoText text="Status" />
          <Text style={styles.labelStyle} />
        </CardSection>
      );
    }
    return this.state.statusDescriptions.map(status => (
      <CardSection key={status.id} style={{ flexDirection: 'column' }}>
        <InfoText text="Status" />
        <Text style={styles.labelStyle}>{status.description}</Text>
      </CardSection>
    ));
  }

  renderFavorite() {
    if (!this.props.exists) {
      return;
    }
    return (
      <Image
        style={styles.starStyle}
        source={require('../assets/images/star.png')} // eslint-disable-line global-require
      />
    );
  }

  render() {
    const imageURL = ImageUtil.organizeImageURL(this.state.launch.rocket);

    return (
      <View style={styles.contentStyle}>
        <View style={styles.thumbnailContainerStyle}>
          <Image
            style={styles.imageStyle}
            source={{ uri: `${imageURL}` }}
            resizeMode="cover"
          />
        </View>
        <CardSection
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={styles.titleStyle}>{this.state.launch.rocket.name}</Text>
          {this.renderFavorite()}
        </CardSection>
        <View style={styles.tabView}>
          <TabView
            navigationState={this.state}
            renderScene={() => this.renderScene()}
            renderTabBar={props => this.renderTabBar(props)}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ height: 0, width: Dimensions.get('window').width }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  contentStyle: {
    flex: 1
  },
  starStyle: {
    height: 32,
    paddingRight: 20,
    width: 32
  },
  imageStyle: {
    height: 200,
    paddingRight: 5,
    paddingLeft: 5,
    width: null
  },
  imagesStyle: {
    height: 400,
    paddingRight: 5,
    paddingLeft: 5,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  thumbnailContainerStyle: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  tabView: {
    flex: 1,
    flexDirection: 'column'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
};

const mapStateToProps = ({ favoriteReducer }) => {
  const { id, name, error, loading, exists } = favoriteReducer;

  return {
    id,
    name,
    error,
    loading,
    exists
  };
};

export default connect(
  mapStateToProps,
  { addThisLaunchToMyFavorites, cheksExistsThisLaunchToMyFavorites }
)(LaunchDetail);
