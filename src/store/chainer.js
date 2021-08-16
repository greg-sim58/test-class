export default class Chainer {
    foo(x)  {
      this.value = x
      return this;
    }
    bar()  {
      this.value += 42
      return this;
    }
    
    baz()  {
      this.value -= 13
      return this;
    }
    
    result()  {
      return this.value;
    }
 }
