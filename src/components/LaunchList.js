import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import launch from '../services/launch';
import { formattedStartDate, formattedEndDate } from '../utils/DateUtil';
import { Spinner } from '../utils/common';
import LaunchListItem from './LaunchListItem';

class LaunchList extends Component {
  constructor() {
    super();
    this.state = {
      launches: [],
      loading: false,
      offset: 0,
      total: 100
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getLaunches();
  }

  async getLaunches() {
    const offset = this.state.offset;

    const response = await launch.get(
      `/${formattedStartDate}/${formattedEndDate}`,
      {
        params: { offset },
        timeout: 10000
      }
    );

    this.processData(response.data);
  }

  processData(data) {
    const newArray = this.state.launches.concat(data.launches);
    this.setState({ launches: newArray, loading: false, total: data.total });
  }

  handleLoadMore() {
    if (this.state.offset === this.state.total - 1) {
      return;
    }
    this.setState(
      {
        offset: this.state.offset + 1
      },
      () => {
        this.getLaunches();
      }
    );
  }

  launchesDisplay() {
    if (this.state.loading === true) {
      return <Spinner size="large" />;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#EEEEEE'
        }}
      >
        <FlatList
          data={this.state.launches}
          renderItem={({ item }) => this.renderList(item)}
          onEndReached={() => {
            //console.log(distanceFromEnd);
            this.handleLoadMore();
          }}
          onEndReachedThreshold={0.5}
          onEndThreshold={0}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderList(item) {
    return <LaunchListItem item={item} />;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        {this.launchesDisplay()}
      </View>
    );
  }
}

export default LaunchList;
