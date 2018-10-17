const mixin={
  methods:{
    testMixin(){
      console.log('%c---- i am mixin ----','color:red;');
    }
  },
  mounted(){
    this.testMixin();
  }
}
export default mixin;
