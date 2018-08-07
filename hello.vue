<template>
    <p>{{ dataH }} World!</p>
</template>

<script>
    module.exports={
        data:function(){
            return {
                dataH:"Hello"
            }
        }
    }
</script>

<style>
    p{
        color: red;
    }
</style>