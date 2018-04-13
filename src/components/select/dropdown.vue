<template>
    <Scrollbar class="ivu-select-dropdown dropdownFix" :class="className" :style="styles" v-if="scrollbar">
        <div>
            <slot></slot>
        </div>
    </Scrollbar>
    <div class="ivu-select-dropdown" :class="className" :style="styles" v-else>
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    const isServer = Vue.prototype.$isServer;
    import {getStyle} from '../../utils/assist';
    const Popper = isServer ? function () {} : require('popper.js');  // eslint-disable-line

    export default {
        name: 'Drop',
        props: {
            placement: {
                type: String,
                default: 'bottom-start'
            },
            className: {
                type: String
            },
            scrollbar: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                popper: null,
                width: ''
            };
        },
        computed: {
            styles () {
                let style = {};
                if (this.width) style.width = `${this.width}px`;
                return style;
            }
        },
        methods: {
            update () {
                if (isServer) return;
                if (this.popper) {
                    this.$nextTick(() => {
                        this.popper.update();
                    });
                } else {
                    this.$nextTick(() => {
                        this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                            gpuAcceleration: false,
                            placement: this.placement,
                            boundariesPadding: 0,
                            forceAbsolute: true,
                            boundariesElement: 'body'
                        });
                        this.popper.onCreate(popper => {
                            this.resetTransformOrigin(popper);
                        });
                    });
                }
                // set a height for parent is Modal and Select's width is 100%
                if (this.$parent.$options.name === 'iSelect') {
                    this.width = parseInt(getStyle(this.$parent.$el, 'width'));
                }
            },
            destroy () {
                if (this.popper) {
                    this.resetTransformOrigin(this.popper);
                    setTimeout(() => {
                        this.popper.destroy();
                        this.popper = null;
                    }, 300);
                }
            },
            resetTransformOrigin(popper) {
                let placementMap = {top: 'bottom', bottom: 'top'};
                let placement = popper._popper.getAttribute('x-placement').split('-')[0];
                let origin = placementMap[placement];
                popper._popper.style.transformOrigin = `center ${ origin }`;
            }
        },
        created () {
            this.$on('on-update-popper', this.update);
            this.$on('on-destroy-popper', this.destroy);
        },
        beforeDestroy () {
            if (this.popper) {
                this.popper.destroy();
            }
        }
    };
</script>
<style>
    .dropdownFix.vue-scrollbar__wrapper {
        background-color: #fff;
        padding: 0;
    }
    .ivu-dropdown .dropdownFix.ivu-select-dropdown{
        max-height: 200px;
    }
</style>
