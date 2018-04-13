<template>
    <Tabs loop value="name1" closable type="card" @on-tab-remove="ccc">
        <!--<Tab-pane :label="label1" name="name1">-->
        <!--<Table :columns="columns1" :data="data1"></Table>-->
        <!--</Tab-pane>-->
        <!--<Tab-pane label="标签二" name="name2">-->
        <!--<Table :columns="columns1" :data="data1"></Table>-->
        <!--</Tab-pane>-->
        <!--<Tab-pane label="标签三" name="name3">-->
        <!--<Table :columns="columns1" :data="data1"></Table>-->
        <!--</Tab-pane>-->
        <ab v-for="(item,i) in test.a" :key="item.a" :index="i" :test="test" @childrenclick="childrenClick"
        ></ab>
        父组件值现在的状态
        <div style="background-color: #19be6b">{{test}}</div>
        <Button @click.native="father">父组件按钮</Button>
    </Tabs>
</template>
<script>
    import ab from './ab.vue';
    export default {
        components: {
            ab
        },
        data () {
            return {
                label1: (h) => {
                    return h('div', [
                        h('span', '标签一'),
                        h('Button', 'button')
                    ]);
                },
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
                ],
                test: {
                    a: [{disabled: 3}, {disabled: 2}, {disabled: 3}, {disabled: 4}, {disabled: 5}, {disabled: 6}],
                    b: {
                        s: 'parent',
                        d: 'parent'
                    }
                }
            };
        },
        watch: {
            'test.a': function (val) {
                console.log('test.a被改掉了');
            }
        },
        methods: {
            father(){
                this.test.b.s = 'parent修改';
            },
            childrenClick(val){
                console.log(val);
                this.test.a[val].disabled = !this.test.a[val].disabled; //这种操作不会触发test.a的监听
//                this.$set(this.test.a, val, !this.test.a[val].disabled); //这种操作会触发test.a的监听
//                this.test.a = JSON.parse(JSON.stringify(this.test.a)); //这种操作会触发test.a的监听
                this.test.b.s = val + '子组件修改';
            },
            ccc(name){
                debugger;
                let closeIndex = name.split('name')[1];
                console.log(closeIndex);
                this.test.a.splice(closeIndex, 1)
                console.log(this.test.a);
                debugger;
            }
        }
    };
</script>
