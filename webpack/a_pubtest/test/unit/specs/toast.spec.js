import {destroyVM, createVue, waitForIt} from "../util";

describe('toast.vue', () => {

  let vm;
  afterEach(() => {
    destroyVM(vm);
  })

  it('test toast content && length', done => {
    vm = createVue({
      render: () => {}
    })

    const testMessage = 'Hello world!';
    let messageContainer = null;

    let testarr=[testMessage,'lalala']
    testarr.map((v)=>{
      vm.$toast(v);
    })

    const selector = 'vue-toast';
    const checkMessageOpens = () => (messageContainer = document.getElementsByClassName(selector));

    messageContainer = document.getElementsByClassName(selector)

    waitForIt(checkMessageOpens, function () {
      expect(messageContainer[0].textContent.trim()).to.equal(testMessage);
      expect(messageContainer.length).to.equal(testarr.length);

      for(let i=0;i<messageContainer.length;i++){
        messageContainer[i].parentElement.removeChild(messageContainer[i])
      }

      done();
    })

  })

  it('toast template content', () => {
    vm = createVue({
      template: `
                <div>
                    <Toast class="toast_test"></Toast>
                </div>
           `,
    })

    expect(vm.$el.querySelector(".toast_test").textContent).to.equal('i am toast div，test、test、test');

  })

})
