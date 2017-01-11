/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
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
import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { HOME_API } from '../constants/Urls';
import  * as actions from '../actions/home';
import Storage from '../utils/Storage';

export function* requestTopShow() {
  try {

    const data = yield call(request,`${HOME_API.topshow}`,'get');
    yield put(actions.receive(types.HOME.TOPSHOW.RECEIVE_TOPSHOW,data.data));
    const errorMessage = data.message;

    if (data.code!==1000) {
      yield toastShort(errorMessage);
    }
  } catch (error) {
    console.log(error)
    yield put(actions.receive(types.HOME.TOPSHOW.RECEIVE_TOPSHOW,[]));
    toastShort('网络发生错误，请重试');
  }
}
export function* requestRanking() {
  try {
    const data = yield call(request,`${HOME_API.ranking}`,'get');
    yield put(actions.receive(types.HOME.RANKING.RECEIVE_RANKING,data.data));
    console.log(data.data);
    for(var items of data.data){
      const data1 = yield call(request,`${HOME_API.rankingList}?rankingId=${items.id}&page=1`,'get');
      yield put(actions.receiveList(types.HOME.RANKINGLIST.RECEIVE_RANKINGLIST,data1.data,items.id));
    }
    const errorMessage = data.message;


    if (data.code!==1000) {
      yield toastShort(errorMessage);
    }
  } catch (error) {
    yield put(actions.receive(types.HOME.RANKING.RECEIVE_RANKING,[]));
    toastShort('网络发生错误，请重试');
  }
}

export function* requestRankingList(isRefreshing, loading, typeId, isLoadMore, page){
  try {
    const data = yield call(request,`${HOME_API.rankingList}?rankingId=${typeId}&page=${page}`,'get');
    yield put(actions.receiveList(types.HOME.RANKINGLIST.RECEIVE_RANKINGLIST,data.data,typeId));
    console.log('*************************S');
  console.log(data.data);
    console.log('*************************E');
    const errorMessage = data.message;

    if (data.code!==1000) {
      yield toastShort(errorMessage);
    }
  } catch (error) {
    console.log(error)
    yield put(actions.receiveList(types.HOME.RANKINGLIST.RECEIVE_RANKINGLIST,[],typeId));
    toastShort('网络发生错误，请重试');
  }
}




// yield put(category());
// const categoryList = yield call(request,
//   `${HOME_API.category}`,
//   'get');
//   yield put(notice());
// const noticeList = yield call(request,
//   `${HOME_API.notice}?type=3`,
//   'get');
//   yield put(ranking());
// const rankingList = yield call(request,
//   `${HOME_API.ranking}`,
//   'get');
// yield put(rankingList(isRefreshing, loading, typeId, isLoadMore, page));
// const rankingListList = yield call(request,
// `${HOME_API.rankingList}?rankingId=${typeId}&page=${page}`,
// 'get');


export function* watchRequestTopShow() {
  while (true) {
    yield take(types.HOME.TOPSHOW.REQUEST_TOPSHOW);
    yield fork(requestTopShow);
  }
}
export function* watchRequestRanking() {
  while (true) {
    yield take(types.HOME.RANKING.REQUEST_RANKING);
    yield fork(requestRanking);
  }
}
export function* watchrequestRankingList() {
  while (true) {
    const {
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    } =  yield take(types.HOME.RANKINGLIST.REQUEST_RANKINGLIST);
    yield fork(requestRankingList, isRefreshing, loading, typeId, isLoadMore, page);
  }
}
