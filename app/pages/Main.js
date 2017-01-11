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
   StyleSheet,
   Platform,
   View,
   Text,
   Image
 } from 'react-native';

 import TabNavigator from 'react-native-tab-navigator';

import LoadingView from '../components/LoadingView';
import Home from '../pages/Home';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import WebViewPage from '../pages/WebViewPage';

const ICON_home = require('../img/tab/tab_btn1_normal.png');
const ICON_activity = require('../img/tab/tab_btn2_normal.png');
const ICON_show = require('../img/tab/tab_btn3_normal.png');
const ICON_care = require('../img/tab/tab_btn4_normal.png');
const ICON_mine = require('../img/tab/tab_btn5_normal.png');

const ICON_home_select = require('../img/tab/tab_btn1_select.png');
const ICON_activity_select  = require('../img/tab/tab_btn2_select.png');
const ICON_show_select  = require('../img/tab/tab_btn3_select.png');
const ICON_care_select  = require('../img/tab/tab_btn4_select.png');
const ICON_mine_select  = require('../img/tab/tab_btn5_select.png');

const HOME = '首页';
const ACTIVITY = '活动';
const SHOW = '即将揭晓';
const FOLLOW = '关注';
const MINE = '我的';

const propTypes = {
  title: PropTypes.string,
  actions: PropTypes.array,
  navigator: PropTypes.object,
};

class Main extends React.Component {
  constructor(props) {
         super(props);
         this.state = {selectedTab: HOME}
     }
     _renderTabItem(img, selectedImg, tag, childView) {
       return (
           <TabNavigator.Item
               selected={this.state.selectedTab === tag}
                title={tag}
                selectedTitleStyle={styles.selectedTitleStyle}
               renderIcon={() => <Image style={styles.tabBarIcon} source={img}/>}
               renderSelectedIcon={() => <Image style={styles.tabBarIcon} source={selectedImg}/>}
               onPress={() => this.setState({ selectedTab: tag })}>
             {childView}
           </TabNavigator.Item>
       );
   }
   _createChildView(tag) {
    let renderView;
    switch (tag) {
        case HOME:
            renderView = <Home {...this.props} />;
            break;
        case ACTIVITY:
            renderView = <Feedback />;
            break;
        case SHOW:
            renderView = <About />;
            break;
        case FOLLOW:
            renderView = <Feedback />;
            break;
        case MINE:
            renderView = <About />;
            break;
        default:
            break;
    }
    return (<View style={styles.container}>{renderView}</View>)
}
   render() {
         return (
             <View style={{flex: 1}}>
                 <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                     {this._renderTabItem(ICON_home, ICON_home_select, HOME, this._createChildView(HOME))}
                     {this._renderTabItem(ICON_activity, ICON_activity_select, ACTIVITY, this._createChildView(ACTIVITY))}
                     {this._renderTabItem(ICON_show, ICON_show_select, SHOW, this._createChildView(SHOW))}
                     {this._renderTabItem(ICON_care, ICON_care_select, FOLLOW, this._createChildView(FOLLOW))}
                     {this._renderTabItem(ICON_mine, ICON_mine_select, MINE, this._createChildView(MINE))}
                 </TabNavigator>
             </View>
         );
     }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff',
    },
    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    selectedTitleStyle:{
      color:'#f84a0d'
    }
})

Main.propTypes = propTypes;

export default Main;
