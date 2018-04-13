<template>
    <collapse-transition>
        <ul :class="classes" v-show="visible">
            <li @click="liStopPropagation">
                <span :class="arrowClasses" @click="handleExpand">
                    <Icon type="arrow-right-b"></Icon>
                </span>
                <Checkbox
                        v-if="showCheckbox"
                        :value="data.checked"
                        :indeterminate="indeterminate"
                        :disabled="data.disabled || data.disableCheckbox"
                        @click.native.prevent="handleCheck"></Checkbox>
                <img class="tree-img" :src="data.src" v-if="data.src"/>
                <template v-if="data.tooltip">
                    <Tooltip :content="data.tooltip" placement="right-start">
                        <span :class="titleClasses" v-html="data.title" @click="handleSelect"></span>
                    </Tooltip>
                </template>
                <template v-else>
                    <span :class="titleClasses" v-html="data.title" @click="handleSelect"></span>
                </template>
                <Tree-node
                        v-for="item in data.children"
                        :key="item.nodeKey"
                        :data="item"
                        :visible="data.expand"
                        :multiple="multiple"
                        :fTocs="fTocs"
                        :cTofs="cTofs"
                        :show-checkbox="showCheckbox">
                </Tree-node>
            </li>
        </ul>
    </collapse-transition>
</template>
<script>
    import Checkbox from '../checkbox/checkbox.vue';
    import Icon from '../icon/icon.vue';
    import CollapseTransition from '../base/collapse-transition';
    import Emitter from '../../mixins/emitter';
    import {findComponentsDownward} from '../../utils/assist';

    const prefixCls = 'ivu-tree';

    export default {
        name: 'TreeNode',
        mixins: [Emitter],
        components: {Checkbox, Icon, CollapseTransition},
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
            visible: {
                type: Boolean,
                default: false
            },
            fTocs: {
                type: Boolean,
                default: true
            },
            cTofs: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                indeterminate: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-children`
                ];
            },
            selectedCls () {
                return [
                    {
                        [`${prefixCls}-node-selected`]: this.data.selected
                    }
                ];
            },
            arrowClasses () {
                return [
                    `${prefixCls}-arrow`,
                    {
                        [`${prefixCls}-arrow-disabled`]: this.data.disabled,
                        [`${prefixCls}-arrow-open`]: this.data.expand,
                        [`${prefixCls}-arrow-hidden`]: !(this.data.children && this.data.children.length)
                    }
                ];
            },
            titleClasses () {
                return [
                    `${prefixCls}-title`,
                    {
                        [`${prefixCls}-title-selected`]: this.data.selected
                    }
                ];
            }
        },
        methods: {
            liStopPropagation (e) {
                e.stopPropagation();
            },
            handleExpand (e) {
                e.stopPropagation();
                if (this.data.disabled) return;
                this.$set(this.data, 'expand', !this.data.expand);
                this.dispatch('Tree', 'toggle-expand', this.data);
            },
            handleSelect (e) {
                e.stopPropagation();
                if (this.data.disabled) return;
                if (this.data.selected) {
                    this.data.selected = false;
                } else if (this.multiple) {
                    this.$set(this.data, 'selected', !this.data.selected);
                } else {
                    this.dispatch('Tree', 'selected', this.data);
                }
                this.dispatch('Tree', 'on-selected');
//                if (this.showCheckbox) { //多选的时候 后期需要不联动效果时可开启
                this.handleCheck(e);
//                }
            },
            handleCheck (e) {
                if (e) e.stopPropagation();
                if (this.disabled) return;
                const checked = !this.data.checked;
                if (!checked || this.indeterminate) {
                    if (this.fTocs) {
                        findComponentsDownward(this, 'TreeNode').forEach(node => node.data.checked = false);
                    }
                } else {
                    if (this.fTocs) {
                        findComponentsDownward(this, 'TreeNode').forEach(node => node.data.checked = true);
                    }
                }
                this.data.checked = checked;
                this.dispatch('Tree', 'checked');
                this.dispatch('Tree', 'on-checked');
                if (this.showCheckbox == false) { //单选的时候
                    if (this.data.selected == false) {
                        //选中数据
                        this.dispatch('Tree', 'on-cancel-node', this.data);
                    } else {
                        //取消选择
                        this.dispatch('Tree', 'on-select-node', this.data);
                    }
                } else {
                    if (this.data.checked == false) {
                        //选中数据
                        this.dispatch('Tree', 'on-cancel-node', this.data);
                    } else {
                        //取消选择
                        this.dispatch('Tree', 'on-select-node', this.data);
                    }
                }
            },
            setIndeterminate () {
                this.indeterminate = this.data.checked ? false : findComponentsDownward(this, 'TreeNode').some(node => node.data.checked);
                if(!this.fTocs && !this.cTofs) {
                    this.indeterminate = false;
                }
            }
        },
        created () {
            // created node.vue first, mounted tree.vue second
            if (!this.data.checked) this.$set(this.data, 'checked', false);
        },
        mounted () {
            this.$on('indeterminate', () => {
                this.broadcast('TreeNode', 'indeterminate');
                this.setIndeterminate();
            });
        }
    };
</script>
<style>
    .tree-img {
        width: 18px;
        height: 18px;
        vertical-align: middle
    }
</style>