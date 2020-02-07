// eslint-disable-next-line no-console

export default {
  name: 'welcome',

  props: {

  },

  data () {
    return {
      main: {
        padding: 15,
        lineHeight: 1.4,
        fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
        backgroundColor: '#ffffff'
      }
    }
  },

  template: `
    <div :style="main">
      <h1>Welcome to the Charles Browser SDK Storybook</h1>
      <p>
        We will explain common patterns here, to get you started in frontend development with our APIs.
      </p>
    </div>
  `,

  methods: {

  }
}
