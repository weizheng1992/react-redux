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
import * as types from '../constants/ActionTypes';

const initialState = {
  topShowList:{},
  rankingList:{},
  rankingListList:{},
  isRefreshing: false,
  isLoadMore:false,
  loading: false,
  noMore: false,
};
export default function topShow(state = initialState, action) {

  switch (action.type) {
    case types.HOME.TOPSHOW.RECEIVE_TOPSHOW:
      return Object.assign({}, state, {
        topShowList:action.data
      });
      case types.HOME.RANKING.RECEIVE_RANKING:
        return Object.assign({}, state, {
          rankingList:action.data
        });
      case types.HOME.RANKINGLIST.RECEIVE_RANKINGLIST:
    
        return Object.assign({}, state, {
          isRefreshing: false,
          isLoadMore: false,
          noMore: action.data.length === 0,
          rankingListList: state.isLoadMore ? loadMore(state, action) : combine(state, action),
          loading: state.rankingListList[action.typeId] === undefined
        });
    default:
      return state;
  }
}



function combine(state, action) {
  state.rankingListList[action.typeId] = action.data;
  return state.rankingListList;
}

function loadMore(state, action) {
  state.rankingListList[action.typeId] = state.rankingListList[action.typeId].concat(action.data);
  return state.rankingListList;
}
