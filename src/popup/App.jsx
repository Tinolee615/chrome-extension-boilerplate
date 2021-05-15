import { defineComponent, ref } from 'vue'

const App = defineComponent({
  name: 'demo',
  setup () {
    const click = (e) => {
      console.log('popup page');
    }
    return {
      click
    }
  },
  render () {
    return (
      <div>
        <div>popup page</div>
        <button onClick={this.click}>点击 popup</button>
      </div>
    )
  }
})

export default App