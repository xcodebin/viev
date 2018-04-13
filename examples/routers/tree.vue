<template>
    <Scrollbar :style="treeStyle" ref="scrollbar">
        <Tree :data="baseData" multiple @on-check-change="handleChange" @on-toggle-expand="showExpand"
              showCheckbox
              :cTof="false"
              :fToc="false"
              :style="{'min-width':'1200px',height:'900px'}"
              @on-select-node="onSelectNode"
              @on-cancel-node="onCancelNode"
              @on-select-change="onSelectChange"
        ></Tree>
    </Scrollbar>
</template>
<script>
    export default {
        data () {
            return {
                bd: [],
                baseData: [
                    {
                        title: 'parent',
                        id: '1-0',
                        expand: true,
                        tooltip: 'aaaa',
                        src: 'http://www.baidu.com/img/bd_logo1.png',
                        children: [
                            {
                                title: 'child1',
                                id: '1-1',

                                // selected: true,
                                expand: true,
                                children: [
                                    {
                                        title: 'child1-1-1',
                                        id: '1-1-1',
                                        checked: true,
                                    },
                                    {
                                        title: 'child1-1-2',
                                        id: '1-1-2',
                                        checked: true,
                                    }
                                ]
                            },
                            {
                                title: 'child2',
                                id: '1-2'
                            }
                        ]
                    }
                ]
            }
        },
        props: {
            treeStyle: {
                type: Object,
                default() {
                    return {height: '100px', 'background-color': 'green'};
                }
            },
        },
        methods: {
            handleSelectChange (data) {
                console.log('啊啊啊', data);
            },
            updateTree (data) {
//                data[0].children[0].checked = true;
//                data[0].children[0].children[0].checked = true;
//                data[0].children[0].children[1].checked = true;
            },
            handleChange () {
                console.log(1)
            },
            showExpand (payload) {
                console.log(payload)
            },
            onSelectNode(data) {
                console.log('onSelectNode', data)
            },
            onCancelNode(data) {
                console.log('onCancelNode', data)
            },
            onSelectChange(data) {
                console.log('onSelectChange', data)
            }
        },
        mounted () {
            this.updateTree(this.baseData);
//            this.$refs.scrollbar.scrollToEnd();
        }
    }
</script>
