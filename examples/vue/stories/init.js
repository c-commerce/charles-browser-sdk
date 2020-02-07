import charles from '../../../'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import PrismEditor from 'vue-prism-editor'

export default {
  name: 'auth-init',
  components: {
    PrismEditor
  },

  props: {
    instructions: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      authResponse: null,
      baseUrl: 'https://staging-3.hello-charles.com',
      universe: null
    }
  },

  computed: {
    password: {
      get () {
        return window.localStorage.getItem('password')
      },
      set (v) {
        window.localStorage.setItem('password', v)
      }
    },
    username: {
      get () {
        return window.localStorage.getItem('username')
      },
      set (v) {
        window.localStorage.setItem('username', v)
      }
    },
    styles () {
      return {
        container: {
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '80%',
          minHeight: '400px'
        },
        inputs: {
          width: '50%',
          overflowX: 'hidden',
          padding: '1rem',
          backgroundColor: 'lightgray'
        },
        results: {
          width: '50%',
          overflowX: 'hidden',
          padding: '1rem',
          backgroundColor: 'lightgray'
        }
      }
    },
    code () {
      return `
const response = await charles.auth.loginUsername({
  username: '${this.username || ''}',
  password: '${(this.password || '').replace(/./g, '*')}',
  baseUrl: '${this.baseUrl}'
})

// we do provide cookie auth. However if you client does not support that
// you can also store the access token and call .init multiple times e.g. on page reresh

charles.init({
  universe: '${this.universe || ''}',
  // or if you are embedded in an agent ui / unviverse
  // universe: window.location.origin,
  credentials: {
    access_token: response.access_token
  },
  user: response.user
})
`
    }
  },

  template: `
    <div :style="styles.container">


      <div :style="styles.inputs">
        <div>
          <input v-model="baseUrl" placeholder="Base URL" />
        </div>
        <hr>

        <input v-model="username" placeholder="Username" />
        <input v-model="password" placeholder="Password" type="password" />

        <hr>
        <hr>
        <button @click="onClick">Submit</button>

        <prism-editor v-if="instructions" readonly :code="code" language="js"></prism-editor>
      </div>

      <div :style="styles.results" >

        <pre v-if="authResponse" v-text="authResponse">
          {{ JSON.stringify(authResponse, undefined, 2) }}
        </pre>

        <div v-else>
          No Token yet
        </div>
      </div>
    </div>
  `,

  methods: {
    async onClick () {
      // charles.init()
      this.$emit('auth-attempt')

      const response = this.authResponse = await charles.auth.loginUsername({ username: this.username, password: this.password, baseUrl: this.baseUrl })

      this.$emit('auth-success', response)
    }
  }
}
