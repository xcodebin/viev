<template>
    <div style="margin: 100px;width:400px">
        <Page :total="300" :current="11" showTotal showSizer show-elevator size="small" placement="top" simple
              @on-page-size-change="onPageSizeChange"
              @on-change="onchange"
        ></Page>

    </div>
</template>
<script>
    export default {
        methods: {
            onPageSizeChange() {
                console.log('1111');
            },
            onchange(){
                console.log('2222')
            }
        }
    };
</script>
