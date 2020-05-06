# [2.62.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.61.2...v2.62.0) (2020-05-06)


### Features

* **Universe:** Add embed:participants.channel_user to getAllFeeds ([f9e8364](https://github.com/c-commerce/charles-browser-sdk/commit/f9e8364121c14521581d17e233883ed66b5fa457))

## [2.61.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.61.1...v2.61.2) (2020-05-05)


### Bug Fixes

* **Entity:** Remove deserialize() when deleting -> response provides no data ([124a792](https://github.com/c-commerce/charles-browser-sdk/commit/124a792da4bfcbcd8f2dce875ffc2c27088483f5))

## [2.61.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.61.0...v2.61.1) (2020-05-04)


### Bug Fixes

* **custom property:** add missing properties ([47427c4](https://github.com/c-commerce/charles-browser-sdk/commit/47427c46d0caa1c9b76312f2188cc0f96d5b8497))

# [2.61.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.60.1...v2.61.0) (2020-05-04)


### Features

* add base custom properties ([8dd5ae0](https://github.com/c-commerce/charles-browser-sdk/commit/8dd5ae0895ba8ee69499d29639315c1650be803c))

## [2.60.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.60.0...v2.60.1) (2020-05-04)


### Bug Fixes

* **Person:** Add custom properties ([9dd39eb](https://github.com/c-commerce/charles-browser-sdk/commit/9dd39eb511b50fbaac8384dc0ae0d7168fca5cf7))

# [2.60.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.59.0...v2.60.0) (2020-05-03)


### Features

* **errors:** handle common properties + localzations ([b1ed1b5](https://github.com/c-commerce/charles-browser-sdk/commit/b1ed1b5ff799800fca93b99657937bbfe2fc5173))

# [2.59.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.58.0...v2.59.0) (2020-05-03)


### Features

* **entitiy:** add apply patch ([48a54c6](https://github.com/c-commerce/charles-browser-sdk/commit/48a54c6bfe0e856ee513b9b54593a5dd3f20fdf5))

# [2.58.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.57.3...v2.58.0) (2020-05-03)


### Features

* **orders/carts:** expose discounts ([f7aee70](https://github.com/c-commerce/charles-browser-sdk/commit/f7aee705cc0e26b059a6275112130a881e921013))

## [2.57.3](https://github.com/c-commerce/charles-browser-sdk/compare/v2.57.2...v2.57.3) (2020-05-03)


### Bug Fixes

* **entity:** cast correctly after setPayload fix ([572f282](https://github.com/c-commerce/charles-browser-sdk/commit/572f282e6f3834d06f675b457c67a164292b0dde))
* **Entity:** DeepClone RawPayload when calling setRawPayload ([4580334](https://github.com/c-commerce/charles-browser-sdk/commit/45803344a83b9ea386219d7731cb81a41ad61b9a))
* **Entity:** Trigger Build ([b232458](https://github.com/c-commerce/charles-browser-sdk/commit/b2324585f991166fe3a3aaca4170f610ac790d64))

## [2.57.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.57.1...v2.57.2) (2020-05-03)


### Bug Fixes

* **person:** inherit from array correctly ([8d29df7](https://github.com/c-commerce/charles-browser-sdk/commit/8d29df7f3101b9874b400b8bb5835b8babb2301f))

## [2.57.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.57.0...v2.57.1) (2020-05-02)


### Bug Fixes

* **MessageTemplate:** Fix rawPayload not being set ([8abcbf8](https://github.com/c-commerce/charles-browser-sdk/commit/8abcbf826b3b57a8a37639cc08714f50245b7d3a))

# [2.57.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.56.1...v2.57.0) (2020-05-01)


### Features

* **person:** add address accesors ([8c4b54d](https://github.com/c-commerce/charles-browser-sdk/commit/8c4b54de4356ae2e6bb67f6df9e7c4675321577f))

## [2.56.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.56.0...v2.56.1) (2020-04-29)


### Bug Fixes

* add missing properties in msg tmpl ([11f72ed](https://github.com/c-commerce/charles-browser-sdk/commit/11f72ed4fb96bc6bcc9ecd720e452f89612120aa))

# [2.56.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.55.0...v2.56.0) (2020-04-29)


### Features

* **Feed:** Feed now inherits from Entity and implements it's required features ([42fe3b4](https://github.com/c-commerce/charles-browser-sdk/commit/42fe3b411bf74cd8d3c28f7f672951673aa64c5b))

# [2.55.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.54.0...v2.55.0) (2020-04-29)


### Features

* **Universe:** Emit mqtt errors on universe ([6a67c9b](https://github.com/c-commerce/charles-browser-sdk/commit/6a67c9b388221e7c352b9a25fb36f85a76091e44))

# [2.54.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.53.0...v2.54.0) (2020-04-28)


### Features

* **Universe Events:** emit universe:feeds:events ([ece0eb5](https://github.com/c-commerce/charles-browser-sdk/commit/ece0eb56971a228734b1f8c8884d8c781bcdbf40))

# [2.53.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.52.1...v2.53.0) (2020-04-27)


### Features

* add message and product categories ([05bdd08](https://github.com/c-commerce/charles-browser-sdk/commit/05bdd08a2feded736e322aec472cac322cd06ed4))
* **entity:** make tapable ([539b912](https://github.com/c-commerce/charles-browser-sdk/commit/539b9121656879fe4cce8949927cf0336a9027dc))

## [2.52.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.52.0...v2.52.1) (2020-04-24)


### Bug Fixes

* **person:** add namePreference ([7a4c1aa](https://github.com/c-commerce/charles-browser-sdk/commit/7a4c1aa1ed9ceb2ab5c612819de69716f85fcf22))
* **person:** Add nickname ([ba95ae1](https://github.com/c-commerce/charles-browser-sdk/commit/ba95ae152e23811f17a30f837a29f828f08169c6))

# [2.52.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.51.1...v2.52.0) (2020-04-23)


### Features

* **Feed:** Support for EntityFetchOptions in feed.fetchLatestEvents ([9e43408](https://github.com/c-commerce/charles-browser-sdk/commit/9e4340845d4b93bc8d275a9946d32391cb99e490))

## [2.51.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.51.0...v2.51.1) (2020-04-22)


### Bug Fixes

* **Cart:** Added id field to CartItem and it's payloads ([a26f7f9](https://github.com/c-commerce/charles-browser-sdk/commit/a26f7f943a634c0a595510c830a9c833646df07e))

# [2.51.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.50.3...v2.51.0) (2020-04-22)


### Features

* **Cart:** Implemented add items to cart ([32a6fcf](https://github.com/c-commerce/charles-browser-sdk/commit/32a6fcfe3236969d04c869cb11f86652794524f7))

## [2.50.3](https://github.com/c-commerce/charles-browser-sdk/compare/v2.50.2...v2.50.3) (2020-04-22)


### Bug Fixes

* **person:** added patch overwrite with omit, added email & phonenumber factory to person ([ce8c37e](https://github.com/c-commerce/charles-browser-sdk/commit/ce8c37ec9073c93eed18a35a1c7cbc4bd3e169c3))

## [2.50.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.50.1...v2.50.2) (2020-04-21)


### Bug Fixes

* **Products:** Add missing raw fetch of products ([ab3537b](https://github.com/c-commerce/charles-browser-sdk/commit/ab3537ba95f2b6d484165d826dede9bf16b79242))

## [2.50.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.50.0...v2.50.1) (2020-04-20)


### Bug Fixes

* **universe:** Add email factory...trigger build 🤦‍♂️ ([4a6c940](https://github.com/c-commerce/charles-browser-sdk/commit/4a6c940554225e09f823a78ca3a8eb5391089148))

# [2.50.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.49.1...v2.50.0) (2020-04-20)


### Features

* **Feed:** Embed feed's topLatestMessages by default, handle&expose topLatestMessages in feed ([c743757](https://github.com/c-commerce/charles-browser-sdk/commit/c7437573e1bc58e789c15fcd28699487251a0d93))

## [2.49.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.49.0...v2.49.1) (2020-04-20)


### Bug Fixes

* **person/email/universe:** fix regression, remove semis ([2dc5f8f](https://github.com/c-commerce/charles-browser-sdk/commit/2dc5f8fbad6265106db3f68bd802f595138c787e))

# [2.49.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.48.0...v2.49.0) (2020-04-20)


### Features

* **Products:** implemented product's children and options ([85baafa](https://github.com/c-commerce/charles-browser-sdk/commit/85baafaba8e2bcd3d9b83d3122427e693af60ae8))

# [2.48.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.47.0...v2.48.0) (2020-04-20)


### Features

* **Person:** Add emails ([dceb380](https://github.com/c-commerce/charles-browser-sdk/commit/dceb380dc9e58d1ebd81ca6f5aa46ab79cf2a8e8))

# [2.47.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.46.0...v2.47.0) (2020-04-19)


### Features

* **Products:** Allow setting products fetch options (embed) ([51a05bb](https://github.com/c-commerce/charles-browser-sdk/commit/51a05bba141a6d3113cfb784dcfb8af0a6f4d24c))

# [2.46.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.45.3...v2.46.0) (2020-04-18)


### Bug Fixes

* **entities:** add back missing stream ([4c2b117](https://github.com/c-commerce/charles-browser-sdk/commit/4c2b117703d89b0f7e4d069a7a4c04f1692b5e57))


### Features

* **feeds:** add streaming feeds ([af43c6a](https://github.com/c-commerce/charles-browser-sdk/commit/af43c6ae0af4d42c74f36e6fe75b624d9c74f654))

## [2.45.3](https://github.com/c-commerce/charles-browser-sdk/compare/v2.45.2...v2.45.3) (2020-04-17)


### Bug Fixes

* use correct linting setup ([3421e30](https://github.com/c-commerce/charles-browser-sdk/commit/3421e3078d724f09b7ee4cf940a9b02fbc529150))

## [2.45.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.45.1...v2.45.2) (2020-04-16)


### Bug Fixes

* **cart:** safely access items in test ([2bf3c8f](https://github.com/c-commerce/charles-browser-sdk/commit/2bf3c8fe295a9c14968918658288d38b5df3061e))
* **cart:** set raw payload, refactor for carts accessor ([d80626a](https://github.com/c-commerce/charles-browser-sdk/commit/d80626a4f66b16efefc88dab509f12abc1f08e0c))

## [2.45.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.45.0...v2.45.1) (2020-04-15)


### Bug Fixes

* **channeluser:** require language to be set ([ed50df2](https://github.com/c-commerce/charles-browser-sdk/commit/ed50df299b27c9c9190ea35cc8eb581240febacc))

# [2.45.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.44.0...v2.45.0) (2020-04-14)


### Features

* **person:** add carts accessor ([9a4a9e6](https://github.com/c-commerce/charles-browser-sdk/commit/9a4a9e6ef9c61dc76418772f7f8f036c4616d2de))

# [2.44.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.43.0...v2.44.0) (2020-04-10)


### Features

* **channel-user:** add message from message template ([f3fbdcf](https://github.com/c-commerce/charles-browser-sdk/commit/f3fbdcf1abbb3b6bfc13d0ca315ead4c32c358ae))

# [2.43.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.42.1...v2.43.0) (2020-04-10)


### Features

* **universe:** add me ([85d415e](https://github.com/c-commerce/charles-browser-sdk/commit/85d415ee56455ec82b64d7acaac1349465332b50))

## [2.42.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.42.0...v2.42.1) (2020-04-09)


### Bug Fixes

* **message-template:** fix endpoint ([6236e0e](https://github.com/c-commerce/charles-browser-sdk/commit/6236e0eb34a090e08fd58cc2cacb90a2b7ac9aae))

# [2.42.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.41.2...v2.42.0) (2020-04-09)


### Features

* **Universe:** Added missing person factories (phonenumber, channelUser) to be able to mock sdk dat ([bae7d3b](https://github.com/c-commerce/charles-browser-sdk/commit/bae7d3b88432899a4a67858b18ee0e7ad85d1538))

## [2.41.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.41.1...v2.41.2) (2020-04-08)


### Bug Fixes

* **Universe:** Trigger release for 081170ba (used wrong conventional commit type) ([05e83ba](https://github.com/c-commerce/charles-browser-sdk/commit/05e83bae2ad1b5502eaaf3ae4b5215312cf9c41a))

## [2.41.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.41.0...v2.41.1) (2020-04-08)


### Bug Fixes

* **universe/docs:** mention getters correctly ([aa40040](https://github.com/c-commerce/charles-browser-sdk/commit/aa400403c13e0becb98bd6b6fad51cc75c291387))

# [2.41.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.40.1...v2.41.0) (2020-04-08)


### Features

* **universe:** unify feeds fetch options and query ([6ea5571](https://github.com/c-commerce/charles-browser-sdk/commit/6ea5571f0fd427b3441c420d52455b994a84aed0))

## [2.40.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.40.0...v2.40.1) (2020-04-07)


### Bug Fixes

* **universe/feeds:** make fetch options optional ([dfd3683](https://github.com/c-commerce/charles-browser-sdk/commit/dfd3683867653850affa746279858af9781d5e23))

# [2.40.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.39.0...v2.40.0) (2020-04-07)


### Features

* **universe/feeds:** refactor fro getter and helper functions ([10d486e](https://github.com/c-commerce/charles-browser-sdk/commit/10d486e3f94157d296182dcc869d92583378bc7d))

# [2.39.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.38.0...v2.39.0) (2020-04-07)


### Features

* **universe:** expose feed factory ([1b0435b](https://github.com/c-commerce/charles-browser-sdk/commit/1b0435b7029be695c0d8e21c30b7538666545d3c))

# [2.38.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.37.0...v2.38.0) (2020-04-04)


### Features

* **universe:** add message templates ([73ae3eb](https://github.com/c-commerce/charles-browser-sdk/commit/73ae3ebb3ecb612f6a5802846c62a267dc4e1fea))

# [2.37.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.36.0...v2.37.0) (2020-04-04)


### Features

* **docs:** add universe search example ([b461f9c](https://github.com/c-commerce/charles-browser-sdk/commit/b461f9c2139a3ca51125c7358209ad7dd2cab46d))

# [2.36.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.35.0...v2.36.0) (2020-04-04)


### Features

* **universe:** add searches ([152bf60](https://github.com/c-commerce/charles-browser-sdk/commit/152bf6096803e81e24483b0110f9dcdc2f39b439))

# [2.35.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.34.0...v2.35.0) (2020-04-04)


### Features

* **event:** add annotations ([62be926](https://github.com/c-commerce/charles-browser-sdk/commit/62be9264ebbea34d59015aef7c46d524d1a14dd8))
* **universe:** add entity factories ([c0a140a](https://github.com/c-commerce/charles-browser-sdk/commit/c0a140a330b6c5f92c153d7961971f2bb2c66d3b))

# [2.34.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.33.0...v2.34.0) (2020-03-31)


### Features

* **reply:** support documents ([f3fa28a](https://github.com/c-commerce/charles-browser-sdk/commit/f3fa28ab69502fd2a8fbc97d205aeaceb1bbfc3e))

# [2.33.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.32.0...v2.33.0) (2020-03-27)


### Features

* **universe:** deinit gracefully ([5e0cf16](https://github.com/c-commerce/charles-browser-sdk/commit/5e0cf16eab98d9228286524a4df42fd5e40b8e6e))
* **universe:** unsibscribe before destroy ([e9c4829](https://github.com/c-commerce/charles-browser-sdk/commit/e9c48299887753cf32abc28b39b3a10fd3409d9a))

# [2.32.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.31.0...v2.32.0) (2020-03-27)


### Features

* **feed:** unsubscribe feed ([e812e94](https://github.com/c-commerce/charles-browser-sdk/commit/e812e9458cdbaab012d3ffa566e207e6b8c89d5f))

# [2.31.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.30.0...v2.31.0) (2020-03-27)


### Features

* **person:** add tags ([62dd5c7](https://github.com/c-commerce/charles-browser-sdk/commit/62dd5c7d7f211a0c1f0c3ae6a9435a8d7b6b5a61))

# [2.30.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.29.0...v2.30.0) (2020-03-26)


### Features

* **person:** add analytics ([563b9ea](https://github.com/c-commerce/charles-browser-sdk/commit/563b9ea3e40d359356deae453e7fc53a00edc0b1))
* **person:** expose channel users ([79b65a0](https://github.com/c-commerce/charles-browser-sdk/commit/79b65a0c259323a57fd76730d4567290fdbb7c14))

# [2.29.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.28.0...v2.29.0) (2020-03-25)


### Features

* **person:** add measurements ([bfb5211](https://github.com/c-commerce/charles-browser-sdk/commit/bfb521109d2fd41e53ccedd4d74ccc5372bc89cd))

# [2.28.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.27.0...v2.28.0) (2020-03-25)


### Features

* **feed:** implement action, correcy cast ([af35b68](https://github.com/c-commerce/charles-browser-sdk/commit/af35b6854c869e715d54e4823114032e397b9285))

# [2.27.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.26.0...v2.27.0) (2020-03-25)


### Features

* **feed:** add feed events ([0ba20b1](https://github.com/c-commerce/charles-browser-sdk/commit/0ba20b12dd632684a298e8f831da482651cd8e9d))

# [2.26.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.25.0...v2.26.0) (2020-03-25)


### Features

* **event:** expose flagged / marked ([276b221](https://github.com/c-commerce/charles-browser-sdk/commit/276b221ad71795b28c556c15275fb629b589ec0e))
* **events:** support conversation events ([11c1ad1](https://github.com/c-commerce/charles-browser-sdk/commit/11c1ad148e2f60929d9ff9ec370b67b6161ba602))
* **feed:** add viewed event ([7264756](https://github.com/c-commerce/charles-browser-sdk/commit/7264756921048d3cda7e1d1ca1489078270b0c0f))

# [2.25.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.24.0...v2.25.0) (2020-03-24)


### Features

* **events:** add flag / mark ([f96db38](https://github.com/c-commerce/charles-browser-sdk/commit/f96db38d2aa5ab18f9619809e0435df52aa09259))

# [2.24.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.23.0...v2.24.0) (2020-03-24)


### Bug Fixes

* **carts/orders:** add missing fields ([a19cd5c](https://github.com/c-commerce/charles-browser-sdk/commit/a19cd5cd1b499cc423a282171f0492bc888381cf))


### Features

* add discounts ([1e63613](https://github.com/c-commerce/charles-browser-sdk/commit/1e636133eab98baa75588b9293c05f3e9be31225))
* **feeds:** add create feed event ([345c7af](https://github.com/c-commerce/charles-browser-sdk/commit/345c7afdb6818a219c2579ee5d79482fd7d944aa))

# [2.23.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.22.0...v2.23.0) (2020-03-22)


### Features

* **commerce:** add carts, orders ([a100034](https://github.com/c-commerce/charles-browser-sdk/commit/a100034fea790aaa9d96dc5eeeabcf36c6eb590c))

# [2.22.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.21.0...v2.22.0) (2020-03-21)


### Features

* **docs:** enhance universe docs ([e3fc841](https://github.com/c-commerce/charles-browser-sdk/commit/e3fc841fe581ef1fefbf5fe54b0364f109d8ceb0))

# [2.21.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.20.2...v2.21.0) (2020-03-21)


### Features

* **entity:** add .fetch ([be94320](https://github.com/c-commerce/charles-browser-sdk/commit/be943208389c34aa172471440f633511007f3c53))

## [2.20.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.20.1...v2.20.2) (2020-03-21)


### Bug Fixes

* **ci:** use stricter build order ([f3583df](https://github.com/c-commerce/charles-browser-sdk/commit/f3583df4b00bb9d3c98f41ac83f599839d90ab7e))

## [2.20.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.20.0...v2.20.1) (2020-03-21)


### Bug Fixes

* **docs:** use correct ci badge ([920ad51](https://github.com/c-commerce/charles-browser-sdk/commit/920ad51a37e2799240178cb5f4a63ff3c7bed899))

# [2.20.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.19.0...v2.20.0) (2020-03-21)


### Features

* **docs:** enhance overall, exports ([7c13856](https://github.com/c-commerce/charles-browser-sdk/commit/7c13856fa7d760eef7e4cc7b5d50def7c5688ebe))
* **docs:** exlcude even more hidden logic ([72ef938](https://github.com/c-commerce/charles-browser-sdk/commit/72ef938259c5f545a3b1fa391227cf36ccbf8ebc))

# [2.19.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.18.1...v2.19.0) (2020-03-21)


### Features

* **entity:** add post and save ([d2312ad](https://github.com/c-commerce/charles-browser-sdk/commit/d2312adaf0450101a55a351952080230f678ac1c))

## [2.18.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.18.0...v2.18.1) (2020-03-21)


### Bug Fixes

* **entity:** merge before diffing ([8d37e9c](https://github.com/c-commerce/charles-browser-sdk/commit/8d37e9cace218442cccd57014489c8b59025599f))

# [2.18.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.17.1...v2.18.0) (2020-03-20)


### Bug Fixes

* **person:** remove unused implementation, add missing fields, add seperate story ([29438d5](https://github.com/c-commerce/charles-browser-sdk/commit/29438d57a5ffaabff2d4cfc7aaf1ce646194af6a))


### Features

* move all entities to extend entity ([23d7518](https://github.com/c-commerce/charles-browser-sdk/commit/23d7518e8f7e09eff8d105ae43cffe3d6dae67cd))

## [2.17.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.17.0...v2.17.1) (2020-03-20)


### Bug Fixes

* **docs:** name correct category ([4d33888](https://github.com/c-commerce/charles-browser-sdk/commit/4d33888877201c5c94457f47c6559457cc66dfd7))

# [2.17.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.16.0...v2.17.0) (2020-03-20)


### Features

* **person:** expose missing fields ([0799b90](https://github.com/c-commerce/charles-browser-sdk/commit/0799b909d288b8f2492c9055ea38ed9ce383dcc8))

# [2.16.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.15.1...v2.16.0) (2020-03-18)


### Bug Fixes

* **products:** make correct path ref (linux) ([56ddcc4](https://github.com/c-commerce/charles-browser-sdk/commit/56ddcc48481d9abfbc9975d7c135d5deb4e98c0c))


### Features

* add products ([37693c6](https://github.com/c-commerce/charles-browser-sdk/commit/37693c6fb886151a7eb3de3f492853446fd1ab80))
* add tickets ([221d557](https://github.com/c-commerce/charles-browser-sdk/commit/221d557ba740ba0467f8ff6552dfbf7fdd221861))

## [2.15.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.15.0...v2.15.1) (2020-03-16)


### Bug Fixes

* **feeds:** add missing serialization ([2b6b445](https://github.com/c-commerce/charles-browser-sdk/commit/2b6b445f13eb3f8a3cf6b202597619ef10199121))

# [2.15.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.14.0...v2.15.0) (2020-03-16)


### Features

* **feeds:** embed participants ([22fc999](https://github.com/c-commerce/charles-browser-sdk/commit/22fc999418ebe27aae816deb5919fa7127cff07d))

# [2.14.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.13.0...v2.14.0) (2020-03-16)


### Features

* **eventing:** handle state updates for callers gracefully ([3c2e1fa](https://github.com/c-commerce/charles-browser-sdk/commit/3c2e1fab5626b89988d26ea65969b0535dd8d2de))

# [2.13.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.12.0...v2.13.0) (2020-03-12)


### Features

* **feed:** add latest events ([3eaab02](https://github.com/c-commerce/charles-browser-sdk/commit/3eaab025c2cd98e79011d72cfa073a7392833881))

# [2.12.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.11.0...v2.12.0) (2020-03-12)


### Features

* **feed:** at latest activity ([44e4d27](https://github.com/c-commerce/charles-browser-sdk/commit/44e4d2729d0ae26b2102c3b55d1f0ca269864537))

# [2.11.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.10.2...v2.11.0) (2020-03-10)


### Features

* **messaging:** add formdata reply ([6c90a2b](https://github.com/c-commerce/charles-browser-sdk/commit/6c90a2b543241cd4fd3556f32227cc1036aa4eca))

## [2.10.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.10.1...v2.10.2) (2020-03-10)


### Bug Fixes

* **entities:** add more missing types ([15a0743](https://github.com/c-commerce/charles-browser-sdk/commit/15a0743afc6ed1d51f2e8cc4646dac3623229124))

## [2.10.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.10.0...v2.10.1) (2020-03-10)


### Bug Fixes

* **entities:** add missing props ([11f1575](https://github.com/c-commerce/charles-browser-sdk/commit/11f15753631ce8f6e9846c551aeae7d23951aaf3))

# [2.10.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.9.1...v2.10.0) (2020-03-10)


### Features

* **entities:** add people, staff, assets ([f41c160](https://github.com/c-commerce/charles-browser-sdk/commit/f41c160a1b54bcb856b5bacec0daef1d9cf59a65))

## [2.9.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.9.0...v2.9.1) (2020-03-08)


### Bug Fixes

* **message:** add back feed ref ([28e3b63](https://github.com/c-commerce/charles-browser-sdk/commit/28e3b6354cb20010a3d34b233be646b8277523fe))

# [2.9.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.8.0...v2.9.0) (2020-03-08)


### Features

* **message:** document content correctly ([43606c8](https://github.com/c-commerce/charles-browser-sdk/commit/43606c85862090d3c449985b16155b8c3a925f05))

# [2.8.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.7.0...v2.8.0) (2020-03-08)


### Features

* **feed:** fix reply, add correct feed mq ([36d58b1](https://github.com/c-commerce/charles-browser-sdk/commit/36d58b184d7b16c0c0d7f3f06f3641e600d3fa6d))
* **universe:** properly de-initialize ([40284e8](https://github.com/c-commerce/charles-browser-sdk/commit/40284e8907a2d57809ecf848be4d10698015bbbd))

# [2.7.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.6.0...v2.7.0) (2020-03-03)


### Features

* **messaging:** get feed specific events ([0602714](https://github.com/c-commerce/charles-browser-sdk/commit/06027149f10981b1d323cee8e620342362104b8f))
* **universe:** add feeds initilisation ([41e37d6](https://github.com/c-commerce/charles-browser-sdk/commit/41e37d6605fd22a7b30b85f169578181312a680d))

# [2.6.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.5.0...v2.6.0) (2020-02-29)


### Features

* **feed/events:** add eventing ([5deb95e](https://github.com/c-commerce/charles-browser-sdk/commit/5deb95e9d2adeaf1b477468c3ff1ac1c92bf7a34))

# [2.5.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.4.0...v2.5.0) (2020-02-28)


### Features

* **feeds/messages:** add feed replyables ([f4f26fe](https://github.com/c-commerce/charles-browser-sdk/commit/f4f26fe62b0bac3048d33a5e19b87f13f15d0d0e))

# [2.4.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.3.0...v2.4.0) (2020-02-26)


### Features

* **messages:** add feed ([4f573f1](https://github.com/c-commerce/charles-browser-sdk/commit/4f573f15f19c249f7b69d5e7c6fbc141330aadad))

# [2.3.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.2.0...v2.3.0) (2020-02-26)


### Features

* **messaging:** add person ([2e23ac3](https://github.com/c-commerce/charles-browser-sdk/commit/2e23ac31511fba0b7a7b8ab14d480c347808c1d9))

# [2.2.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.1.0...v2.2.0) (2020-02-25)


### Bug Fixes

* **ci:** build docs seperately ([cd358e0](https://github.com/c-commerce/charles-browser-sdk/commit/cd358e0338fd63e72d8c4dd3b32031a8711881c4))
* **ci:** do not use caches ([3addb4d](https://github.com/c-commerce/charles-browser-sdk/commit/3addb4d1b3a72e0d5c9139e26ad1b81b97c9edf1))
* **ci:** force cache clearing ([e93bc28](https://github.com/c-commerce/charles-browser-sdk/commit/e93bc2804eea86e0b862485c286272567296b326))
* **ci:** force replace typedocs ts ([534ac7e](https://github.com/c-commerce/charles-browser-sdk/commit/534ac7e7b9c273fdf7a0a55ec21407675c15edda))
* **ci:** maybe fix cache by moving back ([c5b1c82](https://github.com/c-commerce/charles-browser-sdk/commit/c5b1c824cd935e0921243ca30c907642e7555776))
* **ci:** pin node ([1272793](https://github.com/c-commerce/charles-browser-sdk/commit/127279337e46d6425d0d8b4b119900a27ce52dfa))
* **ci:** pin ts ([a4f9605](https://github.com/c-commerce/charles-browser-sdk/commit/a4f960513c6f36dab44cc2878ee80a4c71675841))
* **ci:** regenerate lock to disable cache ([8f0e16e](https://github.com/c-commerce/charles-browser-sdk/commit/8f0e16e6da32f6c111c9d83bef4f8872684f3dd5))
* **ci:** split docs ([d9dca01](https://github.com/c-commerce/charles-browser-sdk/commit/d9dca01c7acb2fe6980e32ce5874ee592d0346a2))
* **ci:** use ci install over i ([ff190e2](https://github.com/c-commerce/charles-browser-sdk/commit/ff190e28f81a1b01fed09dc30310b413729accba))


### Features

* **universe:** make message replyable ([05dee55](https://github.com/c-commerce/charles-browser-sdk/commit/05dee55de32d4030b99ea9524c83575630ac50d3))

# [2.1.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.0.1...v2.1.0) (2020-02-24)


### Features

* **messaging:** add Message ([b765776](https://github.com/c-commerce/charles-browser-sdk/commit/b765776d93204b304b54d93c8d282489df232a4e))

## [2.0.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.0.0...v2.0.1) (2020-02-24)


### Bug Fixes

* **docs:** correct typo to force publish ([da85548](https://github.com/c-commerce/charles-browser-sdk/commit/da85548266b62f35a876c63ff6d01096ffba17ab))

# 1.0.0 (2020-02-22)


### Bug Fixes

* use correct import paths ([7bfed0f](https://github.com/c-commerce/charles-browser-sdk/commit/7bfed0fee087c7475a5d0d22ad53b20c120bcc34))

# [1.1.0](https://github.com/c-commerce/charles-browser-sdk/compare/v1.0.0...v1.1.0) (2020-02-22)


### Bug Fixes

* rename access token ([f35bd70](https://github.com/c-commerce/charles-browser-sdk/commit/f35bd7084d386823eedd30546ecf63b355ef7c4f))
* use ts-jest transform ([e26d1a6](https://github.com/c-commerce/charles-browser-sdk/commit/e26d1a6edca4749a43dc2cd8a185be5bbc90512b))
* **ci:** do not transform examples ([a820652](https://github.com/c-commerce/charles-browser-sdk/commit/a8206527428a90f57853ae45e495853cc3506713))
* **ci:** ignore examples ([199b7b2](https://github.com/c-commerce/charles-browser-sdk/commit/199b7b25e3a1f949a01f502cb3b0fddae533014a))
* **ci:** use correct docs sequence ([b2fcab0](https://github.com/c-commerce/charles-browser-sdk/commit/b2fcab03b46776918615f64f42ea0011b733bb30))


### Features

* add proper storybook ([66fbf77](https://github.com/c-commerce/charles-browser-sdk/commit/66fbf778e372a4313a40aeebde9f221267aaf00c))
* **deps:** add node event ([a1588fe](https://github.com/c-commerce/charles-browser-sdk/commit/a1588fe1f7e7d7bc1b9496c13d7837e0382229de))

# 1.0.0 (2020-02-20)


### Bug Fixes

* use correct init implementation ([c880f0b](https://github.com/c-commerce/charles-browser-sdk/commit/c880f0bcc30ce5a694e4706f14be8230c866d207))
* use correct repo ref ([a49d2a6](https://github.com/c-commerce/charles-browser-sdk/commit/a49d2a682bb82145b9efaac830136282c0efe9c6))
