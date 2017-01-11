/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
 import React, { PropTypes } from 'react';
 import {
   InteractionManager,
   StyleSheet,
   Text,
   View,
   ListView,
   Image,
   TouchableHighlight,
   TouchableOpacity,
   RecyclerViewBackedScrollView,
   ScrollView,
   RefreshControl,
   ActivityIndicator,
   DeviceEventEmitter
 } from 'react-native';

 import Storage from '../utils/Storage';
 import Button from '../components/Button';
 import TimeAgo from 'react-native-timeago';
 import NavigationBar from '../components/NavigationBar';
 import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
 import LoadingView from '../components/LoadingView';
 import { toastShort } from '../utils/ToastUtil';
import * as types from '../constants/ActionTypes';
import Swiper from 'react-native-swiper';
import { formatStringWithHtml } from '../utils/FormatUtil';



require('moment/locale/zh-cn');

const propTypes = {
  homeActions: PropTypes.object,
    home: PropTypes.object.isRequired
};

let tempTopShow = [];
let canLoadMore;
let page = 1;
let loadMoreTime = 0;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),

    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    canLoadMore = false;
  }



  componentDidMount() {
    const { homeActions,home } = this.props;
    homeActions.request(types.HOME.TOPSHOW.REQUEST_TOPSHOW);
    homeActions.request(types.HOME.RANKING.REQUEST_RANKING);


    // homeActions.requestList(types.HOME.RANKINGLIST.REQUEST_RANKINGLIST,true,false,home.rankingList[0].id);
    //homeActions.requestRanking();
  }


  componentWillReceiveProps(nextProps) {
    const { home } = this.props;
    if (home.isLoadMore && !nextProps.home.isLoadMore && !nextProps.home.isRefreshing) {
      if (nextProps.home.noMore) {
        toastShort('没有更多数据了');
      }
    }
  }


  onRefresh(typeId) {
    const { homeActions } = this.props;
    canLoadMore = false;
    homeActions.requestList(types.HOME.RANKINGLIST.REQUEST_RANKINGLIST,true,false, typeId);
  }
  onScroll() {
    if (!canLoadMore) {
      canLoadMore = true;
    }
  }
  onEndReached(typeId) {
    const time = Date.parse(new Date()) / 1000;
    if (canLoadMore && time - loadMoreTime > 1) {
      page += 1;
      const { homeActions } = this.props;
      homeActions.requestList(types.HOME.RANKINGLIST.REQUEST_RANKINGLIST,false, false, typeId, true, page);
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }
  rendeCategory(){
    return(
    <View style={styles.categoryList}>
        <View style={styles.categoryItem}>
          <Image
            source={require('../img/home_product.png')}
          />
          <Text style={{marginTop:9,fontSize:16}}>
            产品
          </Text>
        </View>
        <View style={styles.categoryItem}>
          <Image

            source={require('../img/home_service.png')}
          />
          <Text style={{marginTop:9,fontSize:16}}>
            服务
          </Text>
        </View>
      <View style={styles.categoryItem}>
          <Image

            source={require('../img/home_order.png')}
          />
          <Text style={{marginTop:9,fontSize:16}}>
            晒单
          </Text>
        </View>
        <View style={styles.categoryItem}>
          <Image

            source={require('../img/home_question.png')}
          />
          <Text style={{marginTop:9,fontSize:16}}>
            常见问题
          </Text>
        </View>
    </View>
    )
  }

  renderContent(dataSource,typeId){
    const { home } = this.props;
    if (home.loading) {
      return <LoadingView />;
    }

      const isEmpty = home.rankingListList[typeId] === undefined || home.rankingListList[typeId].length === 0;

      if (isEmpty) {
        return (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={false}
            contentContainerStyle={styles.no_data}
            style={styles.base}
            refreshControl={
              <RefreshControl
                style={styles.refreshControlBase}
                refreshing={home.isRefreshing}
                onRefresh={() => this.onRefresh(typeId)}
                title="Loading..."
                colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
              />
            }
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>
                目前没有数据，请刷新重试……
              </Text>
            </View>
          </ScrollView>
        );
      }
      return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
        onEndReached={() => this.onEndReached(typeId)}
        onEndReachedThreshold={10}
        onScroll={this.onScroll}
        renderFooter={this.renderFooter}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        refreshControl={
          <RefreshControl
            style={styles.refreshControlBase}
            refreshing={home.isRefreshing}
            onRefresh={() => this.onRefresh(typeId)}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }
  renderItem(article) {
    console.log('****************home S*****************')
    console.log(article)
      console.log('****************home E*****************')
    return (
      <TouchableOpacity>
        <View style={styles.containerItem}>
          <Image
            style={styles.itemImg}
            source={{ uri: article.icon }}
          />
          <View style={styles.itemRightContent} >
            <Text style={styles.title}>
              {formatStringWithHtml(article.name)}
            </Text>
            <View style={styles.itemRightBottom} >
              <Text style={styles.userName} >
                {article.productId}
              </Text>
              <TimeAgo
                style={styles.timeAgo}
                time={article.beginTime}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  renderFooter() {
      const { home } = this.props;
      if (home.isLoadMore) {
        return (
          <View style={styles.footerContainer} >
            <ActivityIndicator size="small" color="#3e9ce9" />
            <Text style={styles.footerText}>
              数据加载中……
            </Text>
          </View>
        );
    }
    return <View />;
  }
  render() {
  const { home } = this.props;

    let navigationBar =
        <NavigationBar
            title='踹客'
          leftImageSource={require('../img/icon_search.png')}
          rightImageSource={require('../img/home_msg.png')}
        />  ;



    return (

        <View style={styles.container}>
          {navigationBar}
          <Swiper height={200} autoplay autoplayTimeout={5} autoplayDirection paginationStyle={{
          bottom: 5, left: null, right: 10
            }}>
              {
               Array.from(home.topShowList).map((data, i) => {
                 return (<Image key={i} source={{uri: data.image}}  style={styles.bannerItem}  />)
               })
             }
         </Swiper>
             {this.rendeCategory()}
              <View style={styles.notice}>
                  <View style={{width:30}}>
                    <Image source={require('../img/home_notice.png')}/>
                    </View>
                    <View style={{flex:1}}>
                  <Text style={styles.noticeTxt}>
                    恭喜用户136****354，1小时前赢取<Text  style={styles.noticeTxtActive}> 小米手机 </Text>一部。
                  </Text>

                  </View>
              </View>
            <ScrollableTabView
                  renderTabBar={() =>
                    <DefaultTabBar
                      tabStyle={styles.tab}
                      textStyle={styles.tabText}
                    />
                  }
                  tabBarBackgroundColor="#fcfcfc"
                  tabBarUnderlineStyle={styles.tabBarUnderline}
                  tabBarActiveTextColor="#3e9ce9"
                  tabBarInactiveTextColor="#aaaaaa"
                >
                 {Array.from(home.rankingList).map((data,i) => {
                    const typeView = (
                      <View
                        key={data.id}
                        tabLabel={data.name}
                        style={styles.base}
                      >
                        {this.renderContent(this.state.dataSource.cloneWithRows(
                          home.rankingListList[data.id] === undefined ? [] :
                          home.rankingListList[data.id]), data.id) }
                      </View>);

                    return typeView;
                  }) }
              </ScrollableTabView>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bannerItem: {
   height:200,
   resizeMode:'stretch',
   justifyContent: 'center',
   alignItems: 'stretch',
 },
 statusBar:{
   backgroundColor:'#ffffff',

 },
 navTitle:{
   backgroundColor:'#0f0f0f',
   color:'#0f0f0f'
 },
 categoryList:{

   backgroundColor:'#ffffff',
   flexDirection:'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   paddingTop:16,
   paddingBottom:16,
 },
 categoryItem:{
   flex:1,justifyContent: 'center',alignItems: 'center'
 },
 notice:{
   flexDirection:'row',
    padding:16
 },
 noticeTxt:{
   flex:1,
   fontSize:12,
   color:'#333333',
   marginLeft:10,

 },
 noticeTxtActive:{
   color:'#f8a40d',
 },
 base: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },

  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10
  },
  itemImg: {
    width: 88,
    height: 66,
    marginRight: 10
  },
  itemRightContent: {
    flex: 1,
    flexDirection: 'column'
  },
  itemRightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    flex: 1,
    fontSize: 14,
    color: '#87CEFA',
    marginTop: 5,
    marginRight: 5
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2
  }
})


Home.propTypes = propTypes;

export default Home;
