import charles from '../../../'
import { action } from '@storybook/addon-actions'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import PrismEditor from 'vue-prism-editor'
// import { linkTo } from '@storybook/addon-links'

import Init from './init'

export default {
  title: 'Feeds',
  component: Init,
  parameters: {
    notes: 'Your base action will be interacting with a universe. A universe is a system and namespace that is itself a URL that provides agent UIs and many more.'
  }
}

export const ListFeeds = () => ({
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
    async initUniverse() {
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

      this.localFeeds = await universe.feeds()
    },
    async handleReply(message, content) {
      const reply = message.reply({ content: { body: content } })

      await reply.send()
    }
  },
  data() {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      localFeeds: [],
      replyContent: []
    }
  },
  computed: {
    universeName: {
      get() {
        return window.localStorage.getItem('universeName')
      },
      set(v) {
        window.localStorage.setItem('universeName', v)
      }
    },
    apiBase: {
      get() {
        return window.localStorage.getItem('apiBase') || 'https://staging-3.hello-charles.com'
      },
      set(v) {
        window.localStorage.setItem('apiBase', v)
      }
    },

    universePayload() {
      if (!this.localUniversePayload) return ''

      return JSON.stringify(this.localUniversePayload, undefined, 2)
        .split('\n')
        .map((line) => {
          return `// ${line}`
        })
        .join('\n')
    },
    feedsPayload() {
      if (!this.localFeeds || !this.localFeeds.length) return ''

      const list = this.localFeeds.map((item) => (item.serialize()))
      return JSON.stringify(list, undefined, 2)
        .split('\n')
        .map((line) => {
          return `// ${line}`
        })
        .join('\n')
    },
    code() {
      return `
import charles from '@heycharles/browser-sdk'
charles.init({
  accessToken: '${this.token || ''}'
})

const universe = charles.universe('${this.universeName || ''}')
// lets init it immediately to get it's remote state
await universe.init()

const feeds = await universe.feeds()

${this.feedsPayload}
      `
    }
  }
})

export const SelectFeedAndInitialise = () => ({
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
          <span>Selected Feed</span>
          <span> {{ selectedFeed ? selectedFeed.id : '-' }} </span>
        </div>
      </div>

      <br>

      <div v-if="!selectedFeed">
        <h2>
          Before Feed Init
        </h2>
        <div v-for="(feed, index) in localFeeds">
          <span v-text="feed.id" />
          <button @click="handleFeedSelect(index)">
            Select
          </button>
        </div>
      </div>
      <div v-else>
        <h2>
          Feed Data
        </h2>


        <div>
          <h3>
            Replayable
          </h3>
          <input placeholder="Reply Content" v-model="replyContent" />
          <input placeholder="URI attachment" v-model="uriAttachment" />
          <input type="file" id="files" name="files" multiple @change="filesChange($event.target.files)" />
          <button @click="handleReply(selectedFeed, replyContent)">
            Reply
          </button>
          <h3>
            Latest Events
          </h3>
          <button @click="handleLatestEvents(selectedFeed, replyContent)">
            Feetch Latest Events
          </button>

          <div style="max-height: 200px;" v-if="latestEvents">
            <div v-for="(event) in latestEvents">
              <p v-text="JSON.stringify(event.serialize(), undefined, 2)" style="white-space: pre-wrap;">
              </p>
            </div>
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
    async initUniverse() {
      charles.init({
        credentials: {
          accessToken: this.token
        }
      })

      const universe = charles.universe(this.universeName, {
        base: this.apiBase
      })

      universe.on('universe:message', (msg) => {
        action('message').call(this, msg)
      })

      universe.on('universe:feeds:messages', (p) => {
        action('feeds:messages').call(this, p)
      })

      universe.on('universe:feeds', (p) => {
        action('feeds').call(this, p)
      })

      await universe.init()

      this.localFeeds = await universe.feeds()
    },
    async handleFeedSelect(index) {
      this.selectedFeed = this.localFeeds[index]

      this.selectedFeed.on('feed:message', (p) => {
        action('feed:messages').call(this, p)
      })

      await this.selectedFeed.init()
    },
    async handleReply(feed, content) {
      let attachments
      let rawAssets
      if (this.formDataAttachment) {
        rawAssets = this.formDataAttachment
      } else if (this.uriAttachment) {
        attachments = [
          {
            type: 'image',
            payload: this.uriAttachment
          }
        ]
      }

      const reply = this.selectedFeed.reply({ content: { body: content, attachments }, rawAssets })

      await reply.send()
    },
    async handleLatestEvents(feed, content) {
      this.latestEvents = await this.selectedFeed.fetchLatestEvents()
      action('latest-events').call(this, this.latestEvents)
    },
    filesChange(fileList) {
      const formData = new FormData()
      if (!fileList.length) return
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        // Here we create unique key 'files[i]' in our response dict
        formData.append('file', file)
      }

      this.formDataAttachment = formData
    }
  },
  data() {
    return {
      token: window.localStorage.getItem('token') || null,
      universe: null,
      localUniversePayload: null,
      localFeeds: [],
      replyContent: null,
      uriAttachment: null,
      formDataAttachment: null,
      selectedFeed: null,
      latestEvents: null
    }
  },
  computed: {
    universeName: {
      get() {
        return window.localStorage.getItem('universeName')
      },
      set(v) {
        window.localStorage.setItem('universeName', v)
      }
    },
    apiBase: {
      get() {
        return window.localStorage.getItem('apiBase') || 'https://staging-3.hello-charles.com'
      },
      set(v) {
        window.localStorage.setItem('apiBase', v)
      }
    },
    code() {
      return `
import charles from '@heycharles/browser-sdk'
charles.init({
  accessToken: '${this.token || ''}'
})

const universe = charles.universe('${this.universeName || ''}')
// lets init it immediately to get it's remote state
await universe.init()

const feeds = await universe.feeds()

${!Number.isFinite(this.selectedFeed) ? '//' : ''} await feeds[selectedFeed].init()
      `
    }
  }
})
