<template>
  <el-container>
    <el-header>
      <h1>公告</h1>
    </el-header>
    <el-main>

    </el-main>
  </el-container>
</template>

<script>


export default {
  name: "View",
  data() {
    return {

      noticeList: []
    }
  },
  methods: {


  },


  created() {
    console.log("created")
  },


}
</script>

<style scoped>

ul li{

  list-style: none;

}

.el-main{
  line-height: 30px;
}

a:hover{
  text-decoration: none;
}
a{
  color:black;
  text-decoration: none;
}
</style>
