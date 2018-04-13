<template>
    <ul :class="wrapClasses" :style="styles" v-if="simple">
        <Row type="flex" align="middle" justify="space-between">
            <i-col>
                <Row type="flex" align="middle" justify="start">
                    <div v-if="showSizer" :class="optsClasses">
                        <div v-if="showSizer" :class="sizerClasses">
                            <template v-if="pageTooltip">
                                <Tooltip :content="t('i.page.tip1')" placement="right">
                                    <i-select v-model="currentPageSize" :size="size" :placement="placement"
                                              @on-change="changeSize">
                                        <i-option v-for="item in pageSizeOpts" :key="item" :value="item"
                                                  style="text-align:center;">{{ item }} {{ t('i.page.page') }}
                                        </i-option>
                                    </i-select>
                                </Tooltip>
                            </template>
                            <template v-else>
                                <i-select v-model="currentPageSize" :size="size" :placement="placement"
                                          @on-change="changeSize">
                                    <i-option v-for="item in pageSizeOpts" :key="item" :value="item"
                                              style="text-align:center;">{{ item }} {{ t('i.page.page') }}
                                    </i-option>
                                </i-select>
                            </template>
                        </div>
                    </div>
                    <slot name="page-btn"></slot>
                </Row>
            </i-col>
            <i-col>
                <Row type="flex" align="middle" justify="center">
                    <template v-if="pageTooltip">
                        <Tooltip :content="t('i.page.tip2')" placement="top">
                            <li
                                    :title="t('i.page.prev')"
                                    :class="prevClasses"
                                    @click="prev">
                                <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
                            </li>
                            <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
                            <li :title="currentPage - 3" v-if="allPages > 5 && currentPage > allPages-1"
                                :class="[prefixCls + '-item']" @click="changePage(currentPage - 3)">
                                <a>{{ currentPage - 3 }}</a></li>
                            <li :title="currentPage - 2" v-if="allPages > 5 && currentPage > allPages-2"
                                :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)">
                                <a>{{ currentPage - 2 }}</a></li>
                            <li :title="2" v-if="(allPages < 6 ) && (currentPage == 4 || currentPage == 5)"
                                :class="[prefixCls + '-item']" @click="changePage(2)"><a>2</a></li>
                            <li :title="3" v-if="(allPages < 6 ) && (currentPage == 5)" :class="[prefixCls + '-item']"
                                @click="changePage(3)"><a>3</a></li>
                            <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']"
                                @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
                            <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages"
                                :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
                            <li :title="currentPage + 1" v-if="currentPage + 1 < allPages"
                                :class="[prefixCls + '-item']" @click="changePage(currentPage + 1)">
                                <a>{{ currentPage + 1 }}</a></li>
                            <li :title="3" v-if="allPages > 3 && currentPage == 1" :class="[prefixCls + '-item']"
                                @click="changePage(3)"><a>3</a></li>
                            <li :title="4" v-if="allPages > 4 && (currentPage == 2 ||currentPage == 1)"
                                :class="[prefixCls + '-item']" @click="changePage(4)"><a>4</a></li>
                            <li :title="allPages" v-if="allPages > 1&& currentPage <= allPages" :class="lastPageClasses"
                                @click="changePage(allPages)"><a>{{ allPages }}</a></li>
                            <li
                                    :title="t('i.page.next')"
                                    :class="nextClasses"
                                    @click="next">
                                <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
                            </li>
                        </Tooltip>
                    </template>
                    <template v-else>
                        <li
                                :title="t('i.page.prev')"
                                :class="prevClasses"
                                @click="prev">
                            <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
                        </li>
                        <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
                        <li :title="currentPage - 3" v-if="allPages > 5 && currentPage > allPages-1"
                            :class="[prefixCls + '-item']" @click="changePage(currentPage - 3)"><a>{{ currentPage - 3
                            }}</a></li>
                        <li :title="currentPage - 2" v-if="allPages > 5 && currentPage > allPages-2"
                            :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2
                            }}</a></li>
                        <li :title="2" v-if="(allPages < 6 ) && (currentPage == 4 || currentPage == 5)"
                            :class="[prefixCls + '-item']" @click="changePage(2)"><a>2</a></li>
                        <li :title="3" v-if="(allPages < 6 ) && (currentPage == 5)" :class="[prefixCls + '-item']"
                            @click="changePage(3)"><a>3</a></li>
                        <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']"
                            @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
                        <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages"
                            :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
                        <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']"
                            @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
                        <li :title="3" v-if="allPages > 3 && currentPage == 1" :class="[prefixCls + '-item']"
                            @click="changePage(3)"><a>3</a></li>
                        <li :title="4" v-if="allPages > 4 && (currentPage == 2 ||currentPage == 1)"
                            :class="[prefixCls + '-item']" @click="changePage(4)"><a>4</a></li>
                        <li :title="allPages" v-if="allPages > 1&& currentPage <= allPages" :class="lastPageClasses"
                            @click="changePage(allPages)"><a>{{ allPages }}</a></li>
                        <li
                                :title="t('i.page.next')"
                                :class="nextClasses"
                                @click="next">
                            <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
                        </li>
                    </template>
                </Row>
            </i-col>
            <i-col>
                <Row type="flex" align="middle" justify="end">
                    <template v-if="pageTooltip">
                        <Tooltip :content="t('i.page.tip3')" placement="top">
                            <div v-if="showElevator" :class="ElevatorClasses">
                                {{ t('i.page.goto') }}
                                <input type="text" :value.once="currentPage" @keyup.enter="changePages">
                                {{ t('i.page.p') }}
                            </div>
                        </Tooltip>
                    </template>
                    <template v-else>
                        <div v-if="showElevator" :class="ElevatorClasses">
                            {{ t('i.page.goto') }}
                            <input type="text" :value.once="currentPage" @keyup.enter="changePages">
                            {{ t('i.page.p') }}
                        </div>
                    </template>
                </Row>
            </i-col>
        </Row>
    </ul>
    <ul :class="wrapClasses" :style="styles" v-else>
        <div v-if="showSizer" :class="optsClasses">
            <div v-if="showSizer" :class="sizerClasses">
                <Tooltip v-if="pageTooltip" :content="t('i.page.tip4')" placement="right">
                    <i-select v-model="currentPageSize" :size="size" :placement="placement" @on-change="changeSize">
                        <i-option v-for="item in pageSizeOpts" :key="item" :value="item" style="text-align:center;">
                            {{ item }} {{ t('i.page.page') }}
                        </i-option>
                    </i-select>
                </Tooltip>
                <template v-else>
                    <i-select v-model="currentPageSize" :size="size" :placement="placement" @on-change="changeSize">
                        <i-option v-for="item in pageSizeOpts" :key="item" :value="item" style="text-align:center;">
                            {{ item }} {{ t('i.page.page') }}
                        </i-option>
                    </i-select>
                </template>
            </div>
        </div>

        <span :class="[prefixCls + '-total']" v-if="showTotal">
            <template v-if="pageTooltip">
                <Tooltip :content="t('i.page.tip5')" placement="top">
                    {{ t('i.page.total') }} {{ total }}
                </Tooltip>
                 <Tooltip :content="t('i.page.tip6')" placement="top">
                    <template v-if="total <= 0">{{ t('i.page.item') }}&nbsp&nbsp&nbsp{{ t('i.page.cur')
                        }}0/0{{ t('i.page.item') }}</template>
                    <template v-else-if="total == 1">{{ t('i.page.item') }}&nbsp&nbsp&nbsp{{ t('i.page.cur')
                        }}1/1{{ t('i.page.item') }}</template>
                    <template v-else>{{ t('i.page.items') }}&nbsp&nbsp&nbsp{{ t('i.page.cur') }}{{ this.currentPageBegin}}/{{this.currentPageEnd}}{{ t('i.page.item')
                        }}</template>
                 </Tooltip>
            </template>
            <template v-else>
                 {{ t('i.page.total') }} {{ total }}
                <template v-if="total <= 0">{{ t('i.page.item') }}&nbsp&nbsp&nbsp{{ t('i.page.cur')
                    }}0/0{{ t('i.page.item') }}</template>
                <template v-else-if="total == 1">{{ t('i.page.item') }}&nbsp&nbsp&nbsp{{ t('i.page.cur')
                    }}1/1{{ t('i.page.item') }}</template>
                <template v-else>{{ t('i.page.items') }}&nbsp&nbsp&nbsp{{ t('i.page.cur') }}{{ this.currentPageBegin}}/{{this.currentPageEnd}}{{ t('i.page.item')
                    }}</template>
            </template>
        </span>
        <slot name="page-btn"></slot>
        <div style="float: right" v-if="pageTooltip">
            <Tooltip :content="t('i.page.tip7')" placement="top">
                <div v-if="showElevator" :class="ElevatorClasses">
                    {{ t('i.page.goto') }}
                    <input type="text" :value.once="currentPage" @keyup.enter="changePages">
                    {{ t('i.page.p') }}
                </div>
            </Tooltip>
        </div>
        <div style="float: right" v-else>
            <div v-if="showElevator" :class="ElevatorClasses">
                {{ t('i.page.goto') }}
                <input type="text" :value.once="currentPage" @keyup.enter="changePages">
                {{ t('i.page.p') }}
            </div>
        </div>
        <div style="float: right" v-if="pageTooltip">
            <Tooltip :content="t('i.page.tip8')" placement="top">
                <li
                        :title="t('i.page.prev')"
                        :class="prevClasses"
                        @click="prev">
                    <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
                </li>
                <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
                <li :title="currentPage - 3" v-if="allPages > 5 && currentPage > allPages-1"
                    :class="[prefixCls + '-item']" @click="changePage(currentPage - 3)"><a>{{ currentPage - 3 }}</a>
                </li>
                <li :title="currentPage - 2" v-if="allPages > 5 && currentPage > allPages-2"
                    :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a>
                </li>
                <li :title="2" v-if="(allPages < 6 ) && (currentPage == 4 || currentPage == 5)"
                    :class="[prefixCls + '-item']" @click="changePage(2)"><a>2</a></li>
                <li :title="3" v-if="(allPages < 6 ) && (currentPage == 5)" :class="[prefixCls + '-item']"
                    @click="changePage(3)"><a>3</a></li>
                <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']"
                    @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
                <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages"
                    :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
                <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']"
                    @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
                <li :title="3" v-if="allPages > 3 && currentPage == 1" :class="[prefixCls + '-item']"
                    @click="changePage(3)"><a>3</a></li>
                <li :title="4" v-if="allPages > 4 && (currentPage == 2 ||currentPage == 1)"
                    :class="[prefixCls + '-item']" @click="changePage(4)"><a>4</a></li>
                <li :title="allPages" v-if="allPages > 1&& currentPage <= allPages" :class="lastPageClasses"
                    @click="changePage(allPages)">
                    <a>{{ allPages }}</a></li>
                <li
                        :title="t('i.page.next')"
                        :class="nextClasses"
                        @click="next">
                    <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
                </li>
            </Tooltip>
        </div>
        <div style="float: right" v-else>
            <li
                    :title="t('i.page.prev')"
                    :class="prevClasses"
                    @click="prev">
                <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
            </li>
            <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
            <li :title="currentPage - 3" v-if="allPages > 5 && currentPage > allPages-1" :class="[prefixCls + '-item']"
                @click="changePage(currentPage - 3)"><a>{{ currentPage - 3 }}</a></li>
            <li :title="currentPage - 2" v-if="allPages > 5 && currentPage > allPages-2" :class="[prefixCls + '-item']"
                @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
            <li :title="2" v-if="(allPages < 6 ) && (currentPage == 4 || currentPage == 5)"
                :class="[prefixCls + '-item']" @click="changePage(2)"><a>2</a></li>
            <li :title="3" v-if="(allPages < 6 ) && (currentPage == 5)" :class="[prefixCls + '-item']"
                @click="changePage(3)"><a>3</a></li>
            <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']"
                @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
            <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages"
                :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
            <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']"
                @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
            <li :title="3" v-if="allPages > 3 && currentPage == 1" :class="[prefixCls + '-item']"
                @click="changePage(3)"><a>3</a></li>
            <li :title="4" v-if="allPages > 4 && (currentPage == 2 ||currentPage == 1)" :class="[prefixCls + '-item']"
                @click="changePage(4)"><a>4</a></li>
            <li :title="allPages" v-if="allPages > 1&& currentPage <= allPages" :class="lastPageClasses" @click="changePage(allPages)">
                <a>{{ allPages }}</a></li>
            <li
                    :title="t('i.page.next')"
                    :class="nextClasses"
                    @click="next">
                <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
            </li>
        </div>
    </ul>
</template>
<script>
	import {oneOf} from '../../utils/assist';
	import iSelect from '../../components/select/select.vue';
	import iOption from '../../components/select/option.vue';
	import tooltip from '../../components/tooltip/tooltip.vue';
	import Locale from '../../mixins/locale';
	const prefixCls = 'ivu-page';
	function isValueNumber(value) {
		return (/^[1-9][0-9]*$/).test(value + '');
	}

	export default {
		name: 'Page',
		mixins: [Locale],
		components: {iSelect, iOption, tooltip},
		props: {
			current: {
				type: Number,
				default: 1
			},
			total: {
				type: Number,
				default: 0
			},
			pageSize: {
				type: Number,
				default: 10
			},
			pageSizeOpts: {
				type: Array,
				default () {
					return [10, 20, 30, 40];
				}
			},
			placement: {
				validator (value) {
					return oneOf(value, ['top', 'bottom']);
				},
				default: 'bottom'
			},
			size: {
				validator (value) {
					return oneOf(value, ['small']);
				}
			},
			simple: {
				type: Boolean,
				default: false
			},
			pageTooltip: {
				type: Boolean,
				default: false
			},
			showTotal: {
				type: Boolean,
				default: false
			},
			showElevator: {
				type: Boolean,
				default: false
			},
			showSizer: {
				type: Boolean,
				default: false
			},
			className: {
				type: String
			},
			styles: {
				type: Object
			},
		},
		data () {
			return {
				prefixCls: prefixCls,
				currentPage: this.current,
				currentPageSize: this.pageSize
			};
		},
		watch: {
			current (val) {
				this.currentPage = val;
			},
			pageSize (val) {
				this.currentPageSize = val;
			}
		},
		computed: {
//            size () {
//                return this.isSmall ? 'small' : 'default';
//            },
			optsClasses () {
				return [
					`${prefixCls}-options`
				];
			},
			sizerClasses () {
				return [
					`${prefixCls}-options-sizer`
				];
			},
			ElevatorClasses () {
				return [
					`${prefixCls}-options-elevator`
				];
			},
			isSmall () {
				return !!this.size;
			},
			allPages () {
				const allPage = Math.ceil(this.total / this.currentPageSize);
				return (allPage === 0) ? 1 : allPage;
			},
			currentPageBegin () {
				return this.currentPageSize * (this.currentPage - 1) + 1;
			},
			currentPageEnd () {
				let value = this.currentPageSize * (this.currentPage);
				if (value > this.total) {
					value = this.total;
				}
				return value;
			},
			simpleWrapClasses () {
				return [
					`${prefixCls}`,
					`${prefixCls}-simple`,
					{
						[`${this.className}`]: !!this.className
					}
				];
			},
			simplePagerClasses () {
				return `${prefixCls}-simple-pager`;
			},
			wrapClasses () {
				return [
					`${prefixCls}`,
					{
						[`${this.className}`]: !!this.className,
						'mini': !!this.size
					}
				];
			},
			prevClasses () {
				return [
					`${prefixCls}-prev`,
					{
						[`${prefixCls}-disabled`]: this.currentPage === 1
					}
				];
			},
			nextClasses () {
				return [
					`${prefixCls}-next`,
					{
						[`${prefixCls}-disabled`]: this.currentPage === this.allPages
					}
				];
			},
			firstPageClasses () {
				return [
					`${prefixCls}-item`,
					{
						[`${prefixCls}-item-active`]: this.currentPage === 1
					}
				];
			},
			lastPageClasses () {
				return [
					`${prefixCls}-item`,
					{
						[`${prefixCls}-item-active`]: this.currentPage === this.allPages
					}
				];
			}
		},
		methods: {
			changePages (event) {
				let val = event.target.value.trim();
				let page = 0;

				if (isValueNumber(val)) {
					val = Number(val);
					if (val != this.current) {
						const allPages = this.allPages;

						if (val > allPages) {
							page = allPages;
						} else {
							page = val;
						}
					}
				} else {
					page = 1;
				}

				if (page) {
					this.currentPage = page;
                    this.$emit('on-page', page);
					event.target.value = page;
				}
			},
			changePage (page) {
				if (this.currentPage != page) {
					this.currentPage = page;
					this.$emit('on-change', page);
				}
			},
			prev () {
				const current = this.currentPage;
				if (current <= 1) {
					return false;
				}
				this.changePage(current - 1);
			},
			next () {
				const current = this.currentPage;
				if (current >= this.allPages) {
					return false;
				}
				this.changePage(current + 1);
			},
			fastPrev () {
				const page = this.currentPage - 5;
				if (page > 0) {
					this.changePage(page);
				} else {
					this.changePage(1);
				}
			},
			fastNext () {
				const page = this.currentPage + 5;
				if (page > this.allPages) {
					this.changePage(this.allPages);
				} else {
					this.changePage(page);
				}
			},
			changeSize () {
				this.$emit('on-page-size-change', this.currentPageSize);
				this.changePage(1);
			},
			onPage (page) {
				this.changePage(page);
			},
			keyDown (e) {
				const key = e.keyCode;
				const condition = (key >= 48 && key <= 57) || key == 8 || key == 37 || key == 39;

				if (!condition) {
					e.preventDefault();
				}
			},
			keyUp (e) {
				const key = e.keyCode;
				const val = parseInt(e.target.value);

				if (key === 38) {
					this.prev();
				} else if (key === 40) {
					this.next();
				} else if (key == 13) {
					let page = 1;

					if (val > this.allPages) {
						page = this.allPages;
					} else if (val <= 0) {
						page = 1;
					} else {
						page = val;
					}

					e.target.value = page;
					this.changePage(page);
				}
			}
		}
	};
</script>
