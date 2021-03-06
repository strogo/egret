//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

/// <reference path="../utils/registerProperty.ts" />
/// <reference path="../utils/registerBindable.ts" />

import { CollectionEvent } from "../events/CollectionEvent";
import { CollectionEventKind } from "../events/CollectionEventKind";
import { registerProperty } from "../utils/registerProperty";
import { ICollection } from "./ICollection";

export class ArrayCollection extends egret.EventDispatcher implements ICollection {
        /**
         * Constructor. <p/>
         * Creates a new ArrayCollection using the specified source array.
         * If no array is specified an empty array will be used.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。<p/>
         * 用指定的原始数组创建一个 ArrayCollection 实例。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor(source?:any[]) {
            super();
            if (source) {
                this._source = source;
            }
            else {
                this._source = [];
            }
        }

        /**
         * @private
         */
        private _source:any[];
        /**
         * The source of data in the ArrayCollection.
         * The ArrayCollection object does not represent any changes that you make
         * directly to the source array. Always use the ICollection methods to view the collection.
         * @language en_US
         */
        /**
         * 数据源
         * 通常情况下请不要直接调用Array的方法操作数据源，否则对应的视图无法收到数据改变的通知。通常都是通过ICollection的接口方法来查看数据。
         * 若对数据源进行了修改，请手动调用refresh()方法刷新数据。
         * @language zh_CN
         */
        public get source():any[] {
            return this._source;
        }

        public set source(value:any[]) {
            if (!value)
                value = [];
            this._source = value;
            this.dispatchCoEvent(CollectionEventKind.RESET);
        }

        /**
         * Applies the sort and filter to the view.
         * The ArrayCollection does not detect source data changes automatically,
         * so you must call the <code>refresh()</code>
         * method to update the view after changing the source data.
         * @language en_US
         */
        /**
         * 在对数据源进行排序或过滤操作后可以手动调用此方法刷新所有数据,以更新视图。
         * ArrayCollection 不会自动检原始数据进行了改变,所以你必须调用<code>refresh()</code>方法去更新显示。
         * @language zh_CN
         */
        public refresh():void {
            this.dispatchCoEvent(CollectionEventKind.REFRESH);
        }

        //--------------------------------------------------------------------------
        //
        // ICollection接口实现方法
        //
        //--------------------------------------------------------------------------

        /**
         * @inheritDoc
         */
        public get length():number {
            return this._source.length;
        }

        /**
         * Adds the specified item to the end of the list.
         * Equivalent to <code>addItemAt(item, length)</code>.
         * @param item The item to add.
         * @language en_US
         */
        /**
         * 向列表末尾添加指定项目。等效于 <code>addItemAt(item, length)</code>。
         * @param item 要被添加的项。
         * @language zh_CN
         */
        public addItem(item:any):void {
            this._source.push(item);
            this.dispatchCoEvent(CollectionEventKind.ADD, this._source.length - 1, -1, [item]);
        }

        /**
         * Adds the item at the specified index.
         * The index of any item greater than the index of the added item is increased by one.
         * If the the specified index is less than zero or greater than the length
         * of the list, a Error which code is 1007 is thrown.
         * @param item The item to place at the index.
         * @param index The index at which to place the item.
         * @language en_US
         */
        /**
         * 在指定的索引处添加项目。
         * 任何大于已添加项目的索引的项目索引都会增加 1。
         * 如果指定的索引比0小或者比最大长度要大。则会抛出1007异常。
         * @param item 要添加的项
         * @param index 要添加的指定索引位置
         * @language zh_CN
         */
        public addItemAt(item:any, index:number):void {
            if (index < 0 || index > this._source.length) {
                DEBUG && egret.$error(1007);
            }
            this._source.splice(index, 0, item);
            this.dispatchCoEvent(CollectionEventKind.ADD, index, -1, [item]);
        }

        /**
         * @inheritDoc
         */
        public getItemAt(index:number):any {
            return this._source[index];
        }

        /**
         * @inheritDoc
         */
        public getItemIndex(item:any):number {
            let length:number = this._source.length;
            for (let i:number = 0; i < length; i++) {
                if (this._source[i] === item) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Notifies the view that an item has been updated.
         * @param item The item within the view that was updated.
         * @language en_US
         */
        /**
         * 通知视图，某个项目的属性已更新。
         * @param item 视图中需要被更新的项。
         * @language zh_CN
         */
        public itemUpdated(item:any):void {
            let index:number = this.getItemIndex(item);
            if (index != -1) {
                this.dispatchCoEvent(CollectionEventKind.UPDATE, index, -1, [item]);
            }
        }

        /**
         * Removes all items from the list.
         * @language en_US
         */
        /**
         * 删除列表中的所有项目。
         * @language zh_CN
         */
        public removeAll():void {
            let items:any[] = this._source.concat();
            this._source = [];
            this.dispatchCoEvent(CollectionEventKind.REMOVE, 0, -1, items);
        }

        /**
         * Removes the item at the specified index and returns it.
         * Any items that were after this index are now one index earlier.
         * @param index The index from which to remove the item.
         * @return The item that was removed.
         * @language en_US
         */
        /**
         * 删除指定索引处的项目并返回该项目。原先位于此索引之后的所有项目的索引现在都向前移动一个位置。
         * @param index 要被移除的项的索引。
         * @return 被移除的项。
         * @language zh_CN
         */
        public removeItemAt(index:number):any {
            if (index < 0 || index >= this._source.length) {
                DEBUG && egret.$error(1007);
                return;
            }
            let item:any = this._source.splice(index, 1)[0];
            this.dispatchCoEvent(CollectionEventKind.REMOVE, index, -1, [item]);
            return item;
        }

        /**
         * Replaces the item at the specified index.
         * @param item The new item to be placed at the specified index.
         * @param index The index at which to place the item.
         * @return The item that was replaced, or <code>null</code> if none.
         * @language en_US
         */
        /**
         * 替换在指定索引处的项目，并返回该项目。
         * @param item 要在指定索引放置的新的项。
         * @param index 要被替换的项的索引位置。
         * @return 被替换的项目，如果没有该项则返回<code>null</code> 。
         * @language zh_CN
         */
        public replaceItemAt(item:any, index:number):any {
            if (index < 0 || index >= this._source.length) {
                DEBUG && egret.$error(1007);
                return;
            }
            let oldItem:any = this._source.splice(index, 1, item)[0];
            this.dispatchCoEvent(CollectionEventKind.REPLACE, index, -1, [item], [oldItem]);
            return oldItem;
        }

        /**
         * Replaces all items with a new source data, this method can not reset the scroller position of view.
         * @param newSource new source data.
         * @language en_US
         */
        /**
         * 用新数据源替换原始数据源，此方法与直接设置source不同，它不会导致目标视图重置滚动位置。
         * @param newSource 新数据。
         * @language zh_CN
         */
        public replaceAll(newSource:any[]):void {
            if (!newSource)
                newSource = [];
            let newLength = newSource.length;
            let oldLength = this._source.length;
            for (let i = newLength; i < oldLength; i++) {
                this.removeItemAt(newLength);
            }
            for (let i = 0; i < newLength; i++) {
                if (i >= oldLength)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            this._source = newSource;
        }

        /**
         * @private
         * 抛出事件
         */
        private dispatchCoEvent(kind:string, location?:number, oldLocation?:number, items?:any[], oldItems?:any[]):void {

            CollectionEvent.dispatchCollectionEvent(this, CollectionEvent.COLLECTION_CHANGE, kind, location, oldLocation, items, oldItems);
        }
    }
registerProperty(ArrayCollection,"source","Array",true);