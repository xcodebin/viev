<template>
    <div style="margin: 100px;">
        <Scrollbar style="height: 300px;width:400px;overflow: scroll">
            <div style="height: 800px;width: 700px">
                <div style="padding-top: 230px;">
                    <Poptip
                            confirm
                            transfer
                            :icon="false"
                            title="您确认删除这条内容吗？"
                            @on-ok="ok"
                            @on-cancel="cancel">
                        <Input slot="title"></Input>
                        <Button>删除</Button>
                    </Poptip>
                    <Poptip
                            confirm
                            title="您确认删除这条内容吗？"
                            @on-ok="ok"
                            :isOkShow="false"
                            :isCancelShow="false"
                            @on-cancel="cancel">
                        <Button>删除</Button>
                    </Poptip>
                </div>
            </div>
        </Scrollbar>

    </div>
</template>
<script>
    export default {
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        }
    }
</script>
