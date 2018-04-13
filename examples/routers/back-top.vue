<style>
    /*body{*/
    /*height: 2000px;*/
    /*}*/
</style>
<template>
    <Scrollbar style="height: 600px" ref="scrollbar" @scroll="bb">
        <div style="height: 1600px;width:300px;background-color: #1c2438">

        </div>
        <BackTop :show="back" @on-click="aa">

        </BackTop>
    </Scrollbar>

</template>
<script>
    export default {
        data(){
            return {
                back: false
            };
        },
        methods: {
            aa(){
                console.log('aa');
                this.$refs.scrollbar.scrollToY(0);
                this.back = false;
            },
            bb(aa){
                console.log(aa);
                if (aa > 300) {
                    this.back = true;
                }
//        		this.$refs.scrollbar.scrollToY(0)
            }
        },
        mounted(){

        }
    };
</script>
