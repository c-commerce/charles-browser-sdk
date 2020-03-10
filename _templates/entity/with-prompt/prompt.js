// const { styles } = require('enquirer')
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the URI name of thew new CRUD resource? (singular)',
    validate (value, state, item, index) {
      if (value.length <= 2) {
        return 'resource should have more than 2 characters'
      }

      return true
    }
  },
  // {
  //   type: 'input',
  //   name: 'schema',
  //   message: 'Which table schema to use?',
  //   validate (value, state, item, index) {
  //     if (value.length <= 2) {
  //       return 'resource should have more than 2 characters'
  //     }

  //     return true
  //   }
  // },
  {
    type: 'input',
    name: 'version',
    message: 'What is the version level of this API?',
    initial: 'v0'
  },
  {
    type: 'confirm',
    name: 'inject_universe',
    message: 'Inject into universe',
    default: true
  },
  {
    type: 'multiselect',
    name: 'methods',
    message: 'Pick the methods to include',
    choices: [
      { name: 'post', value: 'post', enabled: true },
      { name: 'patch', value: 'patch', enabled: true },
      { name: 'delete', value: 'delete', enabled: true },
      { name: 'fetch', value: 'fetch', enabled: true }
    ]
  }
]
