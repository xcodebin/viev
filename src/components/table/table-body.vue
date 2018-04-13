<template>
    <Scrollbar :style="scrollStyle" ref="scrollbars" :nover="nover" :nohor="nohor" @verticalScr="verticalScr"
               @horizontalScr="horizontalScr" @scrollToEnd="scrollToEnd">
        <table cellspacing="0" cellpadding="0" border="0" :style="styleObject">
            <colgroup>
                <col v-for="(column, index) in columns" :width="getCell(column, index)">
            </colgroup>
            <tbody :class="[prefixCls + '-tbody']">
            <template v-for="(row, index) in data">
                <table-tr
                        :row="row"
                        :key="row._rowKey"
                        :prefix-cls="prefixCls"
                        @mouseenter.native.stop="handleMouseIn(row._index)"
                        @mouseleave.native.stop="handleMouseOut(row._index)"
                        @click.native="clickCurrentRow(row._index)"
                        @dblclick.native.stop="dblclickCurrentRow(row._index)">
                    <td v-for="column in columns" :class="alignCls(column, row)">
                        <Cell
                                :fixed="fixed"
                                :prefix-cls="prefixCls"
                                :row="row"
                                :key="column._columnKey"
                                :column="column"
                                :natural-index="index"
                                :index="row._index"
                                :checked="rowChecked(row._index)"
                                :disabled="rowDisabled(row._index)"
                                :expanded="rowExpanded(row._index)"
                        ></Cell>
                    </td>
                </table-tr>
                <tr v-if="rowExpanded(row._index)">
                    <td :colspan="columns.length" :class="prefixCls + '-expanded-cell'">
                        <Expand :key="row._rowKey" :row="row" :render="expandRender" :index="row._index"></Expand>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </Scrollbar>
</template>
<script>
    // todo :key="row"
    import TableTr from './table-tr.vue';
    import Cell from './cell.vue';
    import Expand from './expand.js';
    import Mixin from './mixin';

    export default {
        name: 'TableBody',
        mixins: [Mixin],
        components: {Cell, Expand, TableTr},
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            data: Array,    // rebuildData
            objData: Object,
            columnsWidth: Object,
            scrollStyle: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            nover: {
                type: Boolean
            },
            nohor: {
                type: Boolean
            }
        },
        computed: {
            expandRender () {
                let render = function () {
                    return '';
                };
                for (let i = 0; i < this.columns.length; i++) {
                    const column = this.columns[i];
                    if (column.type && column.type === 'expand') {
                        if (column.render) render = column.render;
                    }
                }
                return render;
            }
        },
        methods: {
            scrollToEnd(data){
//	        	console.log('滑到底了',data);
                this.$emit('scrollToEnd', data);
            },
            rowChecked (_index) {
                return this.objData[_index] && this.objData[_index]._isChecked;
            },
            rowDisabled(_index){
                return this.objData[_index] && this.objData[_index]._isDisabled;
            },
            rowExpanded(_index){
                return this.objData[_index] && this.objData[_index]._isExpanded;
            },
            handleMouseIn (_index) {
                this.$parent.handleMouseIn(_index);
            },
            handleMouseOut (_index) {
                this.$parent.handleMouseOut(_index);
            },
            clickCurrentRow (_index) {
                this.$parent.clickCurrentRow(_index);
            },
            dblclickCurrentRow (_index) {
                this.$parent.dblclickCurrentRow(_index);
            },
            verticalScr(H){
                this.$emit('verticalScr', H);
            },
            horizontalScr(W){
                this.$emit('horizontalScr', W);
            },
            getCell(column, index){
                let colWidth = this.setCellWidth(column, index, false);
                this.$set(this.$parent.$data.colWidth, index, colWidth);
//                this.$parent.$data.colWidth[index] = colWidth;
                return colWidth;
            }
        }
    };
</script>
