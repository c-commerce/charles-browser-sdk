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
    universeAction: function () {
      action('universe').call(this, ...arguments)
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

      this.universeAction(universe)

      this.localUniversePayload = universe.payload
    }
  },
  data () {
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
  }
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
        <pre v-text="JSON.stringify(message.message.serialize(), undefined, 2)">
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
  data () {
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
  }
})

export const InitializationAndDefaultSubscriptionsAndReply = () => ({
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
      <div v-for="(message, index) in messages" :key="index">
        <p v-text="message.message.content.body">
        </p>
        <input placeholder="Reply Content" v-model="replyContent[index]" />
        <button @click="handleReply(message.message, replyContent[index])">
          Reply
        </button>
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
        // this.messages.push(msg)
        action('message').call(this, msg)
      })

      universe.on('universe:feeds:messages', (p) => {
        action('feeds:messages').call(this, p)
      })

      universe.on('universe:feeds', (p) => {
        action('feeds').call(this, p)
      })

      await universe.init()

      this.localUniversePayload = universe.payload
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
      messages: [],
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
    code () {
      return `
import charles from '@heycharles/browser-sdk'
charles.init({
  accessToken: '${this.token || ''}'
})

const universe = charles.universe('${this.universeName || ''}')
// lets init it immediately to get it's remote state
await universe.init()

universe.on('universe:message', (event) => {
  event.message
    .reply({ content: { body: '${this.replyContent[0] ? this.replyContent[0] : ''}' } })
    .send()
    .then(() => {}).catch((err) => {})
})
      `
    }
  }
})

export const FetchEntities = () => ({
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

      <div style="display: flex; flex-wrap: wrap;">
        <div style="width: 30%; max-height: 300px; overflow: scroll;">
          <h2>
            Feeds
          </h2>
          <div v-for="(feed, index) in feeds" :key="index">
            <p v-text="JSON.stringify(feed.serialize(), undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
        </div>
        <div style="width: 30%; max-height: 300px; overflow: scroll;">
          <h2>
            Assets
          </h2>
          <div v-for="(asset, index) in assets" :key="index">
            <p v-text="JSON.stringify(asset.serialize(), undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
        </div>
        <div style="width: 30%; max-height: 300px; overflow: scroll;">
          <h2>
            Staff
          </h2>
          <div v-for="(staff, index) in staffs" :key="index">
            <p v-text="JSON.stringify(staff.serialize(), undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
        </div>
        <div style="width: 30%; max-height: 300px; overflow: scroll;">
          <h2>
            People
          </h2>
          <div v-for="(person, index) in people" :key="index">
            <p v-text="JSON.stringify(person.serialize(), undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
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

      universe.on('universe:message', (msg) => {
        this.messages.push(msg)
        action('message').call(this, msg)
      })

      universe.on('universe:feeds:messages', (p) => {
        action('feeds:messages').call(this, p)
      })

      universe.on('universe:feeds', (p) => {
        action('feeds').call(this, p)
      })

      await universe.init()
      this.feeds = await universe.feeds()
      this.assets = await universe.assets()
      this.staffs = await universe.staffs()
      this.people = await universe.people()

      this.localUniversePayload = universe.payload
    }
  },
  data () {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      messages: [],
      replyContent: [],
      feeds: [],
      assets: [],
      people: [],
      staffs: []
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

await universe.staff()
await universe.assets()
await universe.feeds()
await universe.people()
      `
    }
  }
})

export const Searches = () => ({
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

      <div style="display: flex; width: 100%; justify-items: space-between;">
        <div style="width: 50%; overflow-x: hidden;">
          <input placeholder="People Search" v-model="peopleSearchInput" />
          <button @click="handlePeopleSearch">
            Execute Search
          </button>

          <div v-for="(item, index) in (peopleSearchResult || [])" :key="index">
            <p v-text="JSON.stringify(item, undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
        </div>
        <div style="width: 50%; overflow-x: hidden;">
          <input placeholder="Feed Search" v-model="feedsSearchInput" />
          <button @click="handleFeedSearch">
            Execute Search
          </button>

          <div v-for="(item, index) in (feedSearchResult || [])" :key="index">
            <p v-text="JSON.stringify(item, undefined, 2)" style="white-space: pre-wrap;">
            </p>
          </div>
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

      const universe = this.universe = charles.universe(this.universeName, {
        base: this.apiBase
      })

      await universe.init()

      this.localUniversePayload = universe.payload
    },
    async handlePeopleSearch () {
      const result = await this.universe.search.people(this.peopleSearchInput)
      this.peopleSearchResult = result
    },
    async handleFeedSearch () {
      const result = await this.universe.search.feeds(this.feedsSearchInput)
      this.feedSearchResult = result
    }
  },
  data () {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      peopleSearchInput: null,
      feedsSearchInput: null,
      peopleSearchResult: null,
      feedSearchResult: null
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

await universe.search.people('${this.peopleSearchInput || ''}')
await universe.search.feeds('${this.feedsSearchInput || ''}')
      `
    }
  }
})
