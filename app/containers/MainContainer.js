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
import React from 'react';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import { bindActionCreators } from 'redux';
import Main from '../pages/Main';
import * as readCreators from '../actions/home';

class MainContainer extends React.Component {
  static componentDidMount() {
    CodePush.sync({
      deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'iReading有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: CodePush.InstallMode.ON_NEXT_RESTART
    });
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const { home } = state;
  return {
    home
  };
};

const mapDispatchToProps = (dispatch) => {
  const homeActions = bindActionCreators(readCreators, dispatch);
  return {
    homeActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
