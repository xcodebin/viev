<template>
    <div v-transfer-dom :data-transfer="transfer">
        <transition :name="transitionNames[1]">
            <div :class="maskClasses" v-show="visible" @click="mask"></div>
        </transition>
        <div :class="wrapClasses" @click="handleWrapClick">
            <transition :name="transitionNames[0]" @after-enter="afterEnter">
                <div :class="classes" :style="mainStyles" v-show="visible">
                    <div :class="[prefixCls + '-content']" :id="id">
                        <Spin size="large" fix class="spin-fix" v-if="isSpin"></Spin>

                        <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
                            <slot name="close">
                                <Icon type="ios-close-empty error"></Icon>
                            </slot>
                        </a>
                        <div :class="[prefixCls + '-header']" v-if="showHead">
                            <slot name="header">
                                <div :class="[prefixCls + '-header-inner',titleAlign]">
                                    <Icon :type="titleIcon" :color="titleIconColor" v-if="titleIcon"></Icon>
                                    {{ title }}
                                </div>
                            </slot>
                        </div>
                        <div :class="[prefixCls + '-body']" :style="{height:modalHeight}">
                            <slot></slot>
                        </div>
                        <div :class="[prefixCls + '-footer',BtnsPosition]" v-if="!footerHide">
                            <slot name="footer" :class='' v-if="!showFooterBtns">
                                <i-button type="primary" v-if="prevShow" size="large" style="float: left" @click='prev'>
                                    {{prevBtnText}}
                                </i-button>
                                <i-button type="primary" v-if="nextShow" size="large" style="float: left" @click='next'>
                                    {{localeNextBtnText}}
                                </i-button>
                                <i-button type="text" size="large" v-if="cancelShow" @click.native="cancel">
                                    {{ localeCancelText }}
                                </i-button>
                                <i-button type="primary" size="large" v-if="okShow" :loading="buttonLoading"
                                          @click.native="ok">
                                    {{ localeOkText }}
                                </i-button>
                            </slot>
                            <slot name="footerBtns" :class="" v-if="showFooterBtns">
                                <Button-group style="float: left">
                                    <Button type="primary" v-if="prevShow" size="large" @click='prev'>{{prevBtnText}}
                                    </Button>
                                    <Button type="primary" v-if="nextShow" size="large" @click='next'>{{localeNextBtnText}}
                                    </Button>
                                </Button-group>

                                <Button-group>
                                    <Button type="primary" size="large" v-if="cancelShow" @click.native="cancel">
                                        {{ localeCancelText }}
                                    </Button>
                                    <Button type="primary" size="large" v-if="okShow" :loading="buttonLoading"
                                            @click.native="ok"> {{ localeOkText }}
                                    </Button>
                                </Button-group>
                            </slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import Icon from '../icon';
    import iButton from '../button/button.vue';
    import TransferDom from '../../directives/transfer-dom';
    import {getScrollBarSize} from '../../utils/assist';
    import Locale from '../../mixins/locale';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-modal';

    export default {
        name: 'Modal',
        mixins: [Locale, Emitter],
        components: {Icon, iButton},
        directives: {TransferDom},
        props: {
            value: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 520
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object
            },
            className: {
                type: String
            },
            // for instance
            footerHide: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            transitionNames: {
                type: Array,
                default() {
                    return ['ease', 'fade'];
                }
            },
            transfer: {
                type: Boolean,
                default: true
            },
            cancelShow: {
                type: Boolean,
                default: true,
            },
            okShow: {
                type: Boolean,
                default: true,
            },
            prevBtnText: {
                type: String,
            },
            nextBtnText: {
                type: String,
            },
            spinTimeout: {
                type: [String, Number],
                default: 8000
            },
            id: {
                type: String,
                default: () => {
                    return 'modal' + new Date().getTime();
                }
            },
            spinShow: {
                type: Boolean,
                default: false
            },
            height: {
                type: [String, Number]
            },
            maskShow: {                   //
                type: Boolean,
                default: true
            },
            titleAlign: {     //
                type: String,
                default: '_left'
            },
            titleIcon: {                 //
                type: String
            },
            titleIconColor: {        //
                type: String,
                default: 'teal'
            },
            showFooterBtns: {                        //
                type: Boolean,
                default: false
            },
            prevShow: {                               //
                type: Boolean,
                default: false
            },
            nextShow: {                            //
                type: Boolean,
                default: false
            },
            BtnsPosition: {                   //
                type: String,
                default: '_right'
            }
        },
        data() {
            return {
                isSpin: this.spinShow,
                prefixCls: prefixCls,
                wrapShow: false,
                showHead: true,
                buttonLoading: false,
                visible: this.value
            };
        },
        computed: {

            modalHeight() {
                if (!this.height) {
                    return;
                }
                if (typeof (this.height) == Number) {
                    return this.height + 'px';
                } else {
                    return this.height;
                }
            },
            wrapClasses() {
                return [
                    `${prefixCls}-wrap`,
                    {
                        [`${prefixCls}-hidden`]: !this.wrapShow,
                        [`${this.className}`]: !!this.className
                    }
                ];
            },
            maskClasses() {
                if (this.maskShow) {
                    return `${prefixCls}-mask`;
                } else {
                    return
                }

            },
            classes() {
                return `${prefixCls}`;
            },
            mainStyles() {
                let style = {};

                const styleWidth = {
                    width: `${this.width}px`
                };

                const customStyle = this.styles ? this.styles : {};

                Object.assign(style, styleWidth, customStyle);

                return style;
            },
            localeNextBtnText() {
                if (this.nextBtnText === undefined) {
                    return this.t('i.modal.nextBtnText');
                } else {
                    return this.nextBtnText;
                }
            },
            localePrevBtnText() {
                if (this.prevBtnText === undefined) {
                    return this.t('i.modal.prevBtnText');
                } else {
                    return this.prevBtnText;
                }
            },
            localeOkText() {
                if (this.okText === undefined) {
                    return this.t('i.modal.okText');
                } else {
                    return this.okText;
                }
            },
            localeCancelText() {
                if (this.cancelText === undefined) {
                    return this.t('i.modal.cancelText');
                } else {
                    return this.cancelText;
                }
            }
        },
        methods: {
            afterEnter() {
                // 动画结束后
//                console.info('窗口展示后');
                this.$emit('on-after-show');
            },
            prev() {    //
                this.$emit('on-prev');
            },
            next() {   //
                this.$emit('on-next');
            },
            close() {
                this.$emit('on-before-close');
                this.visible = false;
                this.$emit('input', false);
                this.$emit('on-cancel');
                this.$emit('on-after-close');
            },
            mask() {
                if (this.maskClosable) {
                    this.close();
                }
            },
            handleWrapClick(event) {
                // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
                const className = event.target.getAttribute('class');
                if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.mask();
            },
            cancel() {
                this.close();
            },
            ok() {
//                if (this.loading) {
//                    this.buttonLoading = true;
//                } else {
//                    this.visible = false;
//                    this.$emit('input', false);
//                }
                this.$emit('on-ok');
            },
            EscClose(e) {
                if (this.visible && this.closable) {
                    if (e.keyCode === 27) {
                        this.close();
                    }
                }
            },
            checkScrollBar() {
                let fullWindowWidth = window.innerWidth;
                if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                    const documentElementRect = document.documentElement.getBoundingClientRect();
                    fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
                }
                this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
                if (this.bodyIsOverflowing) {
                    this.scrollBarWidth = getScrollBarSize();
                }
            },
            setScrollBar() {
                if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                    document.body.style.paddingRight = `${this.scrollBarWidth}px`;
                }
            },
            resetScrollBar() {
                document.body.style.paddingRight = '';
            },
            addScrollEffect() {
                this.checkScrollBar();
                this.setScrollBar();
                document.body.style.overflow = 'hidden';
            },
            removeScrollEffect() {
                document.body.style.overflow = '';
                this.resetScrollBar();
            }
        },
        mounted() {

            if (this.visible) {
                this.wrapShow = true;
            }

            let showHead = true;

            if (this.$slots.header === undefined && !this.title) {
                showHead = false;
            }

            this.showHead = showHead;

            // ESC close
            document.addEventListener('keydown', this.EscClose);

//            this.spinShow = false;
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.EscClose);
            this.removeScrollEffect();
        },
        created() {
//            this.spinShow = true;
        },
        watch: {
            spinShow(val) {
                this.isSpin = val;
            },
            value(val) {
                this.visible = val;
            },
            visible(val) {
                let a = null;
                if (this.spinShow) {
                    this.isSpin = true;
                    a = setTimeout(() => {
                        this.isSpin = false;
                        this.$emit('on-after-load');
                    }, this.spinTimeout);
                } else {
                    clearTimeout(a);
                }
                if (val === false) {
                    this.buttonLoading = false;
                    this.timer = setTimeout(() => {
                        this.wrapShow = false;
                        this.removeScrollEffect();
                    }, 300);
                } else {
                    this.$emit('on-before-show');
                    if (this.timer) clearTimeout(this.timer);
                    this.wrapShow = true;
                    if (!this.scrollable) {
                        this.addScrollEffect();
                    }

                }
                this.broadcast('Table', 'on-visible-change', val);
            },
            loading(val) {
                if (!val) {
                    this.buttonLoading = false;
                }
            },
            scrollable(val) {
                if (!val) {
                    this.addScrollEffect();
                } else {
                    this.removeScrollEffect();
                }
            },
            title(val) {
                if (this.$slots.header === undefined) {
                    this.showHead = !!val;
                }
            }
        },
//        updated (){
//            this.isSpin = true;
//        }
    };
</script>

<!--//================-->
<style lang="less">
    ._right {

    }

    ._center {
        text-align: center;
    }

    ._left {
        text-align: left;
    }
</style>
