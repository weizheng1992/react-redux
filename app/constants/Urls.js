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


//home
export const HOME_API = {
    /**
     * 首页轮播图
     * @param int page
     * @param int size
     */
    topshow: 'api/v1/topshow',
    /**
     * 首页分类
     * @param int page
     * @param int size
     * @param {int} categoryId  根据分类id得到分类列表  否
     */
    category: 'api/v1/category',
    /**
     * 消息列表
     * @param {int}  userId   用户id
     * @param {int}  type     1：系统通知；2：中奖  3 首页轮播
     * @param {int}  page
     * @param {int}  size
     */
    notice: 'api/v1/notice',
    /**
     * 获取首页排行
     * @param int page
     * @param int size
     */
    ranking: 'api/v1/ranking',
    /**
     * 获取排行数据
     * @param {int}  rankingId   排行榜ID
     * @param {int}  userId      用户id     判断用户是否收藏     否
     * @param {int}  page
     * @param {int}  size
     */
    rankingList: 'api/v1/rankingList',
};
