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
import { put, call } from 'redux-saga/effects';

import { requestTopShow } from '../home';
import { request } from '../../utils/RequestUtil';
import { HOME_API } from '../../constants/Urls';
import  * as actions from '../actions/home';
import Storage from '../../utils/Storage';
import * as types from '../constants/ActionTypes';

/* global expect */
describe('home saga tests', () => {
  const generator = requestTopShow();
  const step = input => generator.next(input).value;

  const mockTypeList = {
    data:  [
        {
          id: '19',
          name: 'Sports',
        },
        {
          id: '2',
          name: 'Entertainment',
        },
      ],
  };

  // it('should put(actions.All.fetch(types.TOPSHOW.FETCH_TOPSHOW))', () => {
  //   const next = step();
  //   expect(next).toEqual(put(actions.All.fetch(types.TOPSHOW.FETCH_TOPSHOW)));
  // });

  it("should call(request, HOME_API.topshow, 'get')", () => {
    const next = step();
    expect(next).toEqual(call(request, HOME_API.topshow, 'get'));
  });

  it('should put(actions.receiveTopShow(types.HOME.TOPSHOW.RECEIVE_TOPSHOW,data.data))', () => {
    const next = step(mockTypeList);
    expect(next).toEqual(put(actions.receiveTopShow(types.HOME.TOPSHOW.RECEIVE_TOPSHOW,mockTypeList.data)));
  });

  // it("should call(Storage.save, 'topShowList', data.data)", () => {
  //   const next = step(mockTypeList);
  //   expect(next).toEqual(call(Storage.save,
  //     'topShowList',
  //     mockTypeList.data));
  // });

  it('should be done', () => {
    const next = generator.next();
    expect(next.done).toEqual(true);
  });
});
