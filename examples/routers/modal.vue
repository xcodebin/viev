<template>
    <div>
        {{ val }}
        <Button @click="confirm">标准</Button>
        <Button @click="custom">自定义按钮文字</Button>
        <Button @click="async">异步关闭</Button>
        <Button type="primary" @click="modal1 = true">显示对话框</Button>
        <Modal
                v-model="modal1"
                title='这是标题'
                @on-ok="ok"
                ref="modal"
                spinTimeout = '1000'
                @on-prev="prev"
                @on-next="next"
                prevBtnText="这是上一步"
                nextBtnText="下一步按钮"
                okText="这是确定按钮"
                cancelText="这是取消按钮"
                height="500px"
                @on-after-load = 'load'
                @on-before-show="onShowBegin"
                @on-after-show="onShow"
                @on-before-close="closeBegin"
                @on-after-close="onClose"
                :spinShow = 'spinShow'
                @on-cancel="cancel">
            <p slot="footer">对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spinShow:true,
                closable:false,
                modal1: false,
                val: '',
                maskClosable:true
            };
        },
        methods: {
            closeBegin (){
                console.log('closeBegin');
            },
            onClose(){
                console.log('onClose');
            },
            onShow () {
                console.log('onshow');
            },
            load (){
                console.log('onload');
            },
            onShowBegin (){
                console.log('onShowBegin');
            },
            prev () {
                this.$Message.info('点击了上一步');
            },
            next (){
                this.$Message.info('点击了下一步');
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            confirm () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    spinTimeout:3000,
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.val,
                                autofocus: true
                            },
                            on: {
                                input: (val) => {
                                    this.val = val;
                                }
                            }
                        }, '一个按钮');
                    },
                    onOk: () => {
                        this.$Message.info('点击了确定');
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            custom () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    okText: 'OK',
                    cancelText: 'Cancel'
                });
            },
            async () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>对话框将在 2秒 后关闭</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.remove();
                            this.$Message.info('异步关闭了对话框');
                        }, 2000);
                    }
                });
            },


        },
        mounted(){

        },
        update(){

        }
    };
</script>
