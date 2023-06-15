<template>
  <div class="sass">
    <div class="box">
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
        <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>

    </div>
  </div>
</template>

<script>
export default {
    name:'SassView',
    data() {
        return {
            
        }
    },

}
</script>

<style lang="scss" scoped>
$num:#d58a8a;
.box{
    width: 600px;
    height: 400px;
    background-color: gray;
    
    ul{
        display: flex;
        width: 100%;
        height: 40px;
        
        background-color: $num;
        li{
            width: 100% * 3;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-right: 1px solid darkgray;
        }
        &:hover{
            background-color: aquamarine;
        }     
    }
    ol{
            flex: 1;
            li{
                flex: 1;
                background-color: cadetblue;
            }
        }
}

</style>

