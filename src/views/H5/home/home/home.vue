<template>
    <div class="home">
        <div class="header">
             <input type="text" class="search"  placeholder="垃圾袋" />
             <div class="tab">
                  <nav>
                      <span>推荐</span>
                      <span>食品</span>
                      <span>百货</span>
                      <span>男装</span>
                      <span>运动</span>
                      <span>手机</span>
                      <span>鞋包</span>
                      <span>内衣</span>
                       <span>水果</span>
                        <span>美妆</span>
                         <span>饰品</span>
                          <span>车品</span>
                  </nav>
             </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
   .home{
    width: 100vw;
    height: 100%;
    .header{
        width: 100%;
        height: 80px;
        position: fixed;
        top: 0px;
        z-index: 999;
    }
    .search{
            width: 98%;
            height: 40px;
            border-radius: 5px;
            background-color: #EEEE;
            border: 0px;
            padding: 0 10px;

    }
    input:-ms-input-placeholder {
        text-align: center;
    }
   }
</style>