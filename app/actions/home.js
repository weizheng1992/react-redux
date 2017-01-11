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


// export function requestTopShow() {
//   return {
//     type: types.HOME.TOPSHOW.REQUEST_TOPSHOW,
//   };
// }
//
//
// export function receiveTopShow(data) {
//   return {
//     type: types.HOME.TOPSHOW.RECEIVE_TOPSHOW,
//     data
//   };
// }
//
// export function requestRanking() {
//   return {
//     type: types.HOME.RANKING.REQUEST_RANKING,
//   };
// }
//
//
// export function receiveRanking(data) {
//   return {
//     type: types.HOME.RANKING.RECEIVE_RANKING,
//     data
//   };
// }

export function request(type) {
  return {
    type: type,
  };
}
export function receive(type,data) {
  return {
    type: type,
    data
  };
}
export function requestList(type,isRefreshing, loading, typeId, isLoadMore, page = 1) {
  return {
    type: type,
    isRefreshing,
    loading,
    isLoadMore,
    typeId,
    page,
  };
}
export function receiveList(type,data, typeId) {
  return {
    type: type,
    data,
    typeId
  };
}


export function category() {
  return {
    type: types.CATEGORY,
  };
}

export function notice() {
  return {
    type: types.NOTICE,

  };
}
export function ranking() {
  return {
    type: types.RANKING,
  };
}
export function rankingList(rankingId,page=1,isRefreshing, loading,isLoadMore) {
  return {
    type: types.RANKING_LIST,
    page,
    rankingId,
    loading,
    isLoadMore
  };
}
