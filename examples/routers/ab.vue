<template>
    <TabPane loop :label="some+'标签'+index" :name="'name'+index">
        <Table :columns="columns1" :data="data1"></Table>
        子组件显示父组件的值：
        <div style="background-color: #a344be">{{test}}</div>
        <Button @click.native="children">子组件按钮</Button>
        <Button @click.native="childrenUnnormal">子组件非正常操作按钮</Button>
    </TabPane>
</template>

<script>
    export default {
        components: {},
        props: {
            index: Number,
            test: Object
        },
        data() {
            return {
                some: null,
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            };
        },
        methods: {
            children(){
                this.some += this.index;
                this.$emit('childrenclick', this.index);
            },
            childrenUnnormal(){
                this.test.b.d = '非正常改掉子组件prop';
            }
        }
    };
</script>

