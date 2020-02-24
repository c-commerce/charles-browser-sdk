import charles from '../../../'
import { action } from '@storybook/addon-actions'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import PrismEditor from 'vue-prism-editor'
// import { linkTo } from '@storybook/addon-links'

import Init from './init'

export default {
  title: 'Universes',
  component: Init,
  parameters: {
    notes: 'Your base action will be interacting with a universe. A universe is a system and namespace that is itself a URL that provides agent UIs and many more.'
  }
}

export const AuthAndInitialization = () => ({
  components: { Init, PrismEditor },
  template: `
    <div>
      <p>
        Make an auth call and retrieve an access token
      </p>

      <init
        @auth-attempt="authAction"
        @auth-success="authSuccessAction"
        :instructions="false"
        store="init-first"
        max-height="150px"
      ></init>

      <p>
        With auth set let's initialise a universe
      </p>

      <input v-model="universeName" :key="universeName" placeholder="Univserse Name" />
      <input v-model="apiBase" :key="apiBase" placeholder="API Base" />

      <button @click="initUniverse">
        Initialise Universe
      </button>

      <prism-editor readonly :code="code" language="js"></prism-editor>
    </div>
  `,
  methods: {
    authAction: function () {
      action('auth-attempt').call(this, ...arguments)
    },
    authSuccessAction: function () {
      this.token = [...arguments][0].access_token

      window.localStorage.setItem('token', this.token)

      action('auth-sucess').call(this, ...arguments)
    },
    async initUniverse () {
      charles.init({
        credentials: {
          accessToken: this.token
        }
      })

      const universe = charles.universe(this.universeName, {
        base: this.apiBase
      })

      await universe.init()

      this.localUniversePayload = universe.payload
    }
  },
  data() {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null
    }
  },
  computed: {
    universeName: {
      get () {
        return window.localStorage.getItem('universeName')
      },
      set (v) {
        window.localStorage.setItem('universeName', v)
      }
    },
    apiBase: {
      get () {
        return window.localStorage.getItem('apiBase') || 'https://staging-3.hello-charles.com'
      },
      set (v) {
        window.localStorage.setItem('apiBase', v)
      }
    },

    universePayload () {
      if (!this.localUniversePayload) return ''

      return JSON.stringify(this.localUniversePayload, undefined, 2)
        .split('\n')
        .map((line) => {
          return `// ${line}`
        })
        .join('\n')
    },
    code () {
      return `
import charles from '@heycharles/browser-sdk'
charles.init({
  accessToken: '${this.token || ''}'
})

const universe = charles.universe('${this.universeName || ''}')
// lets init it immediately to get it's remote state
await universe.init()
${this.universePayload}
      `
    }
  },
})

export const InitializationAndDefaultSubscriptions = () => ({
  components: { Init, PrismEditor },
  template: `
    <div>
      <p>
        Make an auth call and retrieve an access token
      </p>

      <init
        @auth-attempt="authAction"
        @auth-success="authSuccessAction"
        :instructions="false"
        store="init-first"
        max-height="150px"
      ></init>

      <p>
        With auth set let's initialise a universe
      </p>

      <input v-model="universeName" :key="universeName" placeholder="Univserse Name" />
      <input v-model="apiBase" :key="apiBase" placeholder="API Base" />

      <button @click="initUniverse">
        Initialise Universe
      </button>

      <prism-editor readonly :code="code" language="js"></prism-editor>
      <div v-for="(message, index) in messages" :key="index">
        <pre v-text="JSON.stringify(message, undefined, 2)">
        </pre>
      </div>
    </div>
  `,
  methods: {
    authAction: function () {
      action('auth-attempt').call(this, ...arguments)
    },
    authSuccessAction: function () {
      this.token = [...arguments][0].access_token

      window.localStorage.setItem('token', this.token)

      action('auth-sucess').call(this, ...arguments)
    },
    async initUniverse () {
      charles.init({
        credentials: {
          accessToken: this.token
        }
      })

      const universe = charles.universe(this.universeName, {
        base: this.apiBase
      })

      universe.on('universe:message', (msg) => {
        this.messages.push(msg)
        action('message').call(this, msg)
      })

      await universe.init()

      this.localUniversePayload = universe.payload
    }
  },
  data() {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      messages: []
    }
  },
  computed: {
    universeName: {
      get () {
        return window.localStorage.getItem('universeName')
      },
      set (v) {
        window.localStorage.setItem('universeName', v)
      }
    },
    apiBase: {
      get () {
        return window.localStorage.getItem('apiBase') || 'https://staging-3.hello-charles.com'
      },
      set (v) {
        window.localStorage.setItem('apiBase', v)
      }
    },

    universePayload () {
      if (!this.localUniversePayload) return ''

      return JSON.stringify(this.localUniversePayload, undefined, 2)
        .split('\n')
        .map((line) => {
          return `// ${line}`
        })
        .join('\n')
    },
    code () {
      return `
import charles from '@heycharles/browser-sdk'
charles.init({
  accessToken: '${this.token || ''}'
})

const universe = charles.universe('${this.universeName || ''}')
// lets init it immediately to get it's remote state
await universe.init()
${this.universePayload}


universe.on('universe:message', (msg) => {
  console.log(msg)
})
      `
    }
  },
})
