import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Init from './init'

export default {
  title: 'Initialization',
  component: Init,
  parameters: {
    notes: 'Follow this guide for proper initialisation of the SDK.'
  }
}

export const Auth = () => ({
  components: { Init },
  template: `
    <div>
      <p>
        Make an auth call and retrieve an access token
      </p>

      <init @auth-attempt="authAction" @auth-success="authSuccessAction" instructions min-height="400px" store="init-first"></init>
    </div>
  `,
  methods: {
    authAction: action('auth-attempt'),
    authSuccessAction: action('auth-sucess')
  }
})
