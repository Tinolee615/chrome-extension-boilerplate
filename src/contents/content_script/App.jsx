import { defineComponent, ref } from 'vue'

const App = defineComponent({
  name: 'demo',
  setup () {
    const click = (e) => {
      console.log('options page');
    }
    return {
      click
    }
  },
  render () {
    return (
      <div>
        <div>options page</div>
        <button onClick={this.click}>点击</button>
      </div>
    )
  }

})

export default App