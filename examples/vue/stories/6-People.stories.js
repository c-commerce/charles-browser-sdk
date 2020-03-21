import charles from '../../../'
import { action } from '@storybook/addon-actions'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import PrismEditor from 'vue-prism-editor'
// import { linkTo } from '@storybook/addon-links'

import Init from './init'

export default {
  title: 'People',
  component: Init,
  parameters: {
    notes: 'Your base action will be interacting with a universe. A universe is a system and namespace that is itself a URL that provides agent UIs and many more.'
  }
}

export const ListPeople = () => ({
  components: { Init, PrismEditor },
  template: `
    <div>
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

      this.localPeople = await universe.people()
    },
    async handleReply (message, content) {
      const reply = message.reply({ content: { body: content } })

      await reply.send()
    }
  },
  data () {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      localPeople: [],
      replyContent: []
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
    ticketsPayload () {
      if (!this.localPeople || !this.localPeople.length) return ''

      const list = this.localPeople.map((item) => (item.serialize()))
      return JSON.stringify(list, undefined, 2)
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

const people = await universe.people()

${this.ticketsPayload}
      `
    }
  }
})

export const ListPeopleSelectAndEditOne = () => ({
  components: { Init, PrismEditor },
  template: `
    <div>
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

            <div>
        <div>
          <span>Selected Person</span>

          <div v-if="selectedPerson">
            <span v-text="selectedPerson.id" />
            <span v-text="selectedPerson.name" />
            <span v-text="selectedPerson.first_name" />
            <span v-text="selectedPerson.last_name" />
            <img :src="selectedPerson.avatar" />
          </div>
          <div>
            N/A (init universe first)
          </div>
        </div>
      </div>

      <br>

      <div v-if="!selectedPerson">
        <h2>
          Before Person Init
        </h2>
        <div v-for="(person, index) in localPeople">
          <span v-text="person.id" />
          <span v-text="person.name" />
          <span v-text="person.first_name" />
          <span v-text="person.last_name" />
          <button @click="handlePersonSelect(index)">
            Select
          </button>
        </div>
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

      await universe.init()

      this.localPeople = await universe.people()
    },
    async handleReply (message, content) {
      const reply = message.reply({ content: { body: content } })

      await reply.send()
    },
    async handlePersonSelect (index) {
      this.selectedPerson = this.localPeople[index]

      await this.selectedPerson.init()
    }
  },
  data () {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      localPeople: [],
      replyContent: [],
      selectedPerson: null
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
    ticketsPayload () {
      if (!this.localPeople || !this.localPeople.length) return ''

      const list = this.localPeople.map((item) => (item.serialize()))
      return JSON.stringify(list, undefined, 2)
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

const people = await universe.people()
      `
    }
  }
})
