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

import { IViewport } from "../../core/IViewport";
import { UIComponent } from "../../core/UIComponent";
import { PropertyEvent } from "../../events/PropertyEvent";
import { Component } from "../Component";

export class ScrollBarBase extends Component {
        /**
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个ScrollBarBase实例。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor() {
            super();
        }

        /**
         * [SkinPart] Thumb display object.
         * @skinPart
         * @language en_US
         */
        /**
         * [SkinPart]滑块显示对象。
         * @skinPart
         * @language zh_CN
         */
        public thumb:UIComponent = null;

        /**
         * @private
         */
        $viewport:IViewport = null;

        /**
         * The viewport controlled by this scrollbar.
         *
         * If a viewport is specified, then changes to its actual size, content
         * size, and scroll position cause the corresponding ScrollBarBase methods to
         * run:
         * <ul>
         *     <li><code>onViewportResize()</code></li>
         *     <li><code>onPropertyChanged()</code></li>
         * </ul><p/>
         *
         * The VScrollBar and HScrollBar classes override these methods to keep their properties in
         * sync with the viewport.
         *
         * @default null
         * @see eui.VScrollBar
         * @see eui.HScrollBar
         * @language en_US
         */
        /**
         * 由该滚动条控制的视区。
         *
         * 如果指定了视区，则对其实际大小、内容大小和滚动位置的更改会导致运行相对应的 ScrollBarBase 方法：
         * <ul>
         *     <li><code>onViewportResize()</code></li>
         *     <li><code>onPropertyChanged()</code></li>
         * </ul><p/>
         *
         * VScrollBar 和 HScrollBar 类需要重写这些方法以保证属性与视区的同步。
         *
         * @default null
         * @see eui.VScrollBar
         * @see eui.HScrollBar
         * @language zh_CN
         */
        public get viewport():IViewport {
            return this.$viewport;
        }

        public set viewport(value:IViewport) {
            if (value == this.$viewport) {
                return;
            }
            let viewport = this.$viewport;
            if (viewport)
            {
                viewport.removeEventListener(PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged,this);
                viewport.removeEventListener(egret.Event.RESIZE, this.onViewportResize,this);
            }
            this.$viewport = value;
            if (value)
            {
                value.addEventListener(PropertyEvent.PROPERTY_CHANGE, this.onPropertyChanged,this);
                value.addEventListener(egret.Event.RESIZE, this.onViewportResize,this);
            }
            this.invalidateDisplayList();
        }

        /**
         * @private
         *
         * @param event
         */
        private onViewportResize(event?:egret.Event):void{
            this.invalidateDisplayList();
        }

        /**
         * Properties of viewport changed.
         * @param event
         * @language en_US
         */
        /**
         * 视区属性发生改变。
         * @param event
         * @language zh_CN
         */
        protected onPropertyChanged(event:PropertyEvent):void{

        }
        /**
         * Whether the scrollbar can be autohide.
         * @language en_US
         */
        /**
         * 是否自动隐藏 scrollbar
         * @language zh_CN
         */
        public autoVisibility:boolean = true;
    }