# [4.2.0](https://github.com/c-commerce/charles-browser-sdk/compare/v4.1.2...v4.2.0) (2021-04-09)


### Bug Fixes

* **feed:** correct _rawPayload type ([e9c115d](https://github.com/c-commerce/charles-browser-sdk/commit/e9c115dbffeb55a3640692d046120c0bb3bb60e0))
* **person:** phonenumber create fix ([3535e09](https://github.com/c-commerce/charles-browser-sdk/commit/3535e090f192e3bb6c18c6a46afce46484a98feb))


### Features

* **person:** phonenumbers ([5d0331a](https://github.com/c-commerce/charles-browser-sdk/commit/5d0331af5a39f5124d6d9ff2277b730552c094c0))

## [4.1.2](https://github.com/c-commerce/charles-browser-sdk/compare/v4.1.1...v4.1.2) (2021-04-08)


### Bug Fixes

* **deal:** add custom properties ([6c084ca](https://github.com/c-commerce/charles-browser-sdk/commit/6c084cad5069997aaca5bedc7259812ad3238420))

## [4.1.1](https://github.com/c-commerce/charles-browser-sdk/compare/v4.1.0...v4.1.1) (2021-04-01)


### Bug Fixes

* **person preview notification:** nit: use own id ([e2f80d5](https://github.com/c-commerce/charles-browser-sdk/commit/e2f80d593abf9461ed86c6b2bea28ee2b0756c73))

# [4.1.0](https://github.com/c-commerce/charles-browser-sdk/compare/v4.0.0...v4.1.0) (2021-04-01)


### Bug Fixes

* **person:** fix feed import ([97a90ac](https://github.com/c-commerce/charles-browser-sdk/commit/97a90acbd4e2c7ab683b6a2df08538ec62f88eda))


### Features

* **person:** preview notification ([1323934](https://github.com/c-commerce/charles-browser-sdk/commit/13239342d796e336c5809d7b36f365d35139881f))

# [4.0.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.98.1...v4.0.0) (2021-03-28)


### Bug Fixes

* **charles:** expose cloud correctly ([8c2f2c3](https://github.com/c-commerce/charles-browser-sdk/commit/8c2f2c3c8f105eaf50348457ac59c349aed4441e))


### Features

* move all handlers to UniverseEntity ([19d348f](https://github.com/c-commerce/charles-browser-sdk/commit/19d348fbec3388c68f79cece695df4ba695c0465))
* move to universe entities ([9ae9576](https://github.com/c-commerce/charles-browser-sdk/commit/9ae9576bf74e93f7fed5082974a6471aed25eab7))


### BREAKING CHANGES

* **charles:** We have refactored our entity class to support more api carriers than Universe.
This is potentially breaking behaviour but should not have any caller impact. It merely tries to
expose a new factory .cloud() on the SDK.

## [3.98.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.98.0...v3.98.1) (2021-03-26)


### Bug Fixes

* **deals:** add links, fix value type ([4311ea9](https://github.com/c-commerce/charles-browser-sdk/commit/4311ea9c4419b61670c47c66c0e83ca9d1f8c2f6))

# [3.98.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.97.0...v3.98.0) (2021-03-25)


### Features

* **universe deals:** implement fetch & head handler ([e7814da](https://github.com/c-commerce/charles-browser-sdk/commit/e7814da1168e08cd03dd30923ce88b8ce7befdb2))

# [3.97.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.96.0...v3.97.0) (2021-03-24)


### Features

* **notification campaign:** fetch feed events ([56d1806](https://github.com/c-commerce/charles-browser-sdk/commit/56d1806ac6f3c0a90f9d5f6280bff90ab5e066f7))

# [3.96.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.95.2...v3.96.0) (2021-03-24)


### Features

* **CRM:** add setup and channel users sync ([96e3e97](https://github.com/c-commerce/charles-browser-sdk/commit/96e3e97180f2fb9bde44c888cb297fd2a725713b))

## [3.95.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.95.1...v3.95.2) (2021-03-19)


### Bug Fixes

* **pipeline:** deserialize stages properly ([af92bb9](https://github.com/c-commerce/charles-browser-sdk/commit/af92bb938e362970d84a0a39e2f9dc6b08d7ceac))

## [3.95.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.95.0...v3.95.1) (2021-03-19)


### Bug Fixes

* **deal:** add missing properties ([8455359](https://github.com/c-commerce/charles-browser-sdk/commit/845535967f782112e016471a897635779ae36bce))

# [3.95.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.94.0...v3.95.0) (2021-03-19)


### Features

* **crm pipelines, stages, deal events:** added resources, implemented person deals accessor ([2ad60f1](https://github.com/c-commerce/charles-browser-sdk/commit/2ad60f11ee2f8d6f586aafb964264a789a8069d7))

# [3.94.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.93.0...v3.94.0) (2021-03-19)


### Features

* **deals:** add resource ([9e6f00e](https://github.com/c-commerce/charles-browser-sdk/commit/9e6f00e2a38dcea430cb45c0a85560eaa9fec8e8))

# [3.93.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.92.0...v3.93.0) (2021-03-18)


### Features

* **crm:** sync pipelines ([e701924](https://github.com/c-commerce/charles-browser-sdk/commit/e701924af3766ab7237694f4256ae07361395230))

# [3.92.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.91.0...v3.92.0) (2021-03-18)


### Features

* **CRM:** sync deals ([4645dc4](https://github.com/c-commerce/charles-browser-sdk/commit/4645dc45cde715ab14d8a5961d35faa6106b3923))

# [3.91.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.90.2...v3.91.0) (2021-03-14)


### Features

* **Feed:** allow public default message subscription ([1be19cd](https://github.com/c-commerce/charles-browser-sdk/commit/1be19cdcbab2e435b19ac1e5709887cd3d38289c))

## [3.90.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.90.1...v3.90.2) (2021-03-14)


### Bug Fixes

* **docs/Feed:** clarify init ([0b8c24f](https://github.com/c-commerce/charles-browser-sdk/commit/0b8c24febe91d32de08c504490b4b3fa83dc6a0d))

## [3.90.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.90.0...v3.90.1) (2021-03-11)


### Bug Fixes

* **custom properties:** add proxy vendor, is proxy, external ref id ([7c68312](https://github.com/c-commerce/charles-browser-sdk/commit/7c6831218fd61419c99311154f36c4a0e1f3b7a4))

# [3.90.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.89.1...v3.90.0) (2021-03-10)


### Features

* **Cart:** Exponse currency ([1785800](https://github.com/c-commerce/charles-browser-sdk/commit/17858001a6e137d2f4cb48e8a59857a615ce020d))

## [3.89.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.89.0...v3.89.1) (2021-03-10)


### Bug Fixes

* **me:** handle response property availability ([e6ee865](https://github.com/c-commerce/charles-browser-sdk/commit/e6ee865b0adff4bf1887e00f1e00703eb76b6738))

# [3.89.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.88.1...v3.89.0) (2021-03-09)


### Features

* **UniverseSearch:** allow additonal queries ([62b663a](https://github.com/c-commerce/charles-browser-sdk/commit/62b663ab2c5c2466ea9d3976e7a4ffd38940104b))

## [3.88.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.88.0...v3.88.1) (2021-03-09)


### Bug Fixes

* **Auth.logout:** use correct options signature, set credentials ([b95b7e5](https://github.com/c-commerce/charles-browser-sdk/commit/b95b7e59544fe6ab9c65ae4037b5861c36f58039))

# [3.88.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.87.1...v3.88.0) (2021-03-09)


### Features

* **Auth.logout:** allow overriding authBaseUrl ([f8d079c](https://github.com/c-commerce/charles-browser-sdk/commit/f8d079c4919816006516607fc6974085ac54430b))

## [3.87.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.87.0...v3.87.1) (2021-03-09)


### Bug Fixes

* **Auth:** handle token logout ([a9a2363](https://github.com/c-commerce/charles-browser-sdk/commit/a9a23632c40f015e3ed0af08d09a6a1ba5634e4c))
* **Auth:** handle withCredentials correctly, assert http in test correctly ([c32302c](https://github.com/c-commerce/charles-browser-sdk/commit/c32302cdc25965b9db9b81cdc37ec8ba036f2545))

# [3.87.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.86.0...v3.87.0) (2021-03-05)


### Features

* **Charles+UniverseFactory:** do not require access token ([7b5f19a](https://github.com/c-commerce/charles-browser-sdk/commit/7b5f19ac5152a48dd4a41d8d3beec0280b494b26))

# [3.86.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.85.0...v3.86.0) (2021-03-05)


### Features

* **Auth:** set cookie auth on withCredentials ([dd0cc59](https://github.com/c-commerce/charles-browser-sdk/commit/dd0cc5973c538bda2bfaa052fa72acc624191e4f))

# [3.85.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.84.0...v3.85.0) (2021-03-05)


### Features

* **CharlesClient:** set authed when cookie auth ([46ab5c0](https://github.com/c-commerce/charles-browser-sdk/commit/46ab5c0720b217f54311fcdd8ac7c44727f5b0f7))

# [3.84.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.83.0...v3.84.0) (2021-03-05)


### Features

* **Charles:** make instance overridable from constructor ([3bbda10](https://github.com/c-commerce/charles-browser-sdk/commit/3bbda10a1ba41bb946d3a2f06f573fe84b65dbad))

# [3.83.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.82.0...v3.83.0) (2021-03-05)


### Features

* **Universe:** expose errors on instance ([821c03e](https://github.com/c-commerce/charles-browser-sdk/commit/821c03e8a148c3b7e89b8af1089363df280feb94))

# [3.82.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.81.1...v3.82.0) (2021-03-04)


### Features

* **universe:** set cached me data ([d93b550](https://github.com/c-commerce/charles-browser-sdk/commit/d93b5505ecb086b2817f04f062314e114f624322))

## [3.81.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.81.0...v3.81.1) (2021-03-04)


### Bug Fixes

* **universe:** make errors interface statically documented ([f77ed3b](https://github.com/c-commerce/charles-browser-sdk/commit/f77ed3b0c10ae019716eb9f0c1b65ce198d01fdd))

# [3.81.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.80.1...v3.81.0) (2021-03-04)


### Features

* **universe:** make me errors statically available ([ac926aa](https://github.com/c-commerce/charles-browser-sdk/commit/ac926aad0bc140569767b384bfca18351ed6f9dd))

## [3.80.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.80.0...v3.80.1) (2021-03-03)


### Bug Fixes

* **person emails:** enahnce emails ([55a2f82](https://github.com/c-commerce/charles-browser-sdk/commit/55a2f821c1c4407f09760069046eb61117e1e6ca))

# [3.80.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.79.1...v3.80.0) (2021-03-03)


### Features

* **Helper / Entity:** added entity check and test ([e8e72be](https://github.com/c-commerce/charles-browser-sdk/commit/e8e72beacdc230588c250fc480b89bc7013433ff))

## [3.79.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.79.0...v3.79.1) (2021-03-03)


### Bug Fixes

* **person:** implement email delete ([95f9892](https://github.com/c-commerce/charles-browser-sdk/commit/95f9892928f8ce2160f5fd4d35eae640d33e3684))

# [3.79.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.78.2...v3.79.0) (2021-03-02)


### Features

* **Event:** serialize context ([5a3c43b](https://github.com/c-commerce/charles-browser-sdk/commit/5a3c43b218e26aa28f4be87b620bbb368ab17c0c))

## [3.78.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.78.1...v3.78.2) (2021-03-01)


### Bug Fixes

* **person email:** implement patch ([b42a076](https://github.com/c-commerce/charles-browser-sdk/commit/b42a07637fb8e614bddb95a07e7054c15c7f1939))

## [3.78.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.78.0...v3.78.1) (2021-03-01)


### Bug Fixes

* **person(email):** imeplement save email ([77d25b3](https://github.com/c-commerce/charles-browser-sdk/commit/77d25b39acbe97f4f2df9d472f3d7f8459f580db))

# [3.78.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.77.0...v3.78.0) (2021-02-26)


### Features

* **crm:** implement sync custom properties ([7502508](https://github.com/c-commerce/charles-browser-sdk/commit/7502508273a71ffe60ac627c6759b6fcfafe46a5))

# [3.77.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.76.3...v3.77.0) (2021-02-18)


### Features

* add CRMs, pipedrive ([ab53b51](https://github.com/c-commerce/charles-browser-sdk/commit/ab53b519f421dfd681a2ed045d006a32b86bfbf8))

## [3.76.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.76.2...v3.76.3) (2021-02-18)


### Bug Fixes

* **person:** do not overwrite embed data when deserializing from patch ([c41b5fc](https://github.com/c-commerce/charles-browser-sdk/commit/c41b5fc64ac2b1aa1a85c0ecc618ad25d4056141))

## [3.76.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.76.1...v3.76.2) (2021-02-11)


### Bug Fixes

* **notification campaigns:** add message author ([35163cb](https://github.com/c-commerce/charles-browser-sdk/commit/35163cb1e80cf858a66822a7cb780c0d308872a3))

## [3.76.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.76.0...v3.76.1) (2021-02-09)


### Bug Fixes

* **custom properties:** add missing resource properties ([78c625f](https://github.com/c-commerce/charles-browser-sdk/commit/78c625ffade92ccd51faed28d0ca6a76cb7a9de5))

# [3.76.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.75.0...v3.76.0) (2021-02-09)


### Features

* **NotificationCampaign:** serialize analytics ([ea53f4c](https://github.com/c-commerce/charles-browser-sdk/commit/ea53f4c22d139b89b5ffbd21bd0bfb6aa4f7a5b5))

# [3.75.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.74.1...v3.75.0) (2021-02-04)


### Features

* **Feed + Person:** serialise .kind ([c58020e](https://github.com/c-commerce/charles-browser-sdk/commit/c58020ee094ab678270075a9cc9cd46bb1995466))

## [3.74.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.74.0...v3.74.1) (2021-02-04)


### Bug Fixes

* **entity list:** handle export ([e46052d](https://github.com/c-commerce/charles-browser-sdk/commit/e46052d8afd42f29c831fdb6bfbb11a034c0a6ce))

# [3.74.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.73.1...v3.74.0) (2021-02-03)


### Features

* **contacts, orders:** implement export handlers ([c359e12](https://github.com/c-commerce/charles-browser-sdk/commit/c359e1219b300b201094f275bd2bdb3f2d98a7d6))

## [3.73.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.73.0...v3.73.1) (2021-02-03)


### Bug Fixes

* **deps:** pin axios for security compliance, catch up ([b3e6545](https://github.com/c-commerce/charles-browser-sdk/commit/b3e6545b5c5fa8afbe6627182e4151401c05d397))

# [3.73.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.72.0...v3.73.0) (2021-02-03)


### Features

* **Notification Campaign:** added message_template_parameters to notification campaigns ([b499d8e](https://github.com/c-commerce/charles-browser-sdk/commit/b499d8efd55fb7917209748b05a31fc83f419af3))

# [3.72.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.71.0...v3.72.0) (2021-02-02)


### Features

* **Feed:** expose order event ([0c49303](https://github.com/c-commerce/charles-browser-sdk/commit/0c4930398db5fe6b24195dd67bff79f677cae892))

# [3.71.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.70.0...v3.71.0) (2021-02-02)


### Features

* **Order:** serialize shipping methods ([978ff3e](https://github.com/c-commerce/charles-browser-sdk/commit/978ff3ee29cfa4fed373e826537e4b6d385abc65))

# [3.70.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.69.1...v3.70.0) (2021-02-02)


### Features

* **Order:** serialize discount amount ([b376103](https://github.com/c-commerce/charles-browser-sdk/commit/b376103823c43c4eaf44cbe02fe108ba711d5422))

## [3.69.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.69.0...v3.69.1) (2021-01-28)


### Bug Fixes

* **Order/association:** use correct method ([4b73648](https://github.com/c-commerce/charles-browser-sdk/commit/4b736482ee6a004562ad66a7aa7f76fa27a71f39))

# [3.69.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.68.0...v3.69.0) (2021-01-28)


### Features

* **Order:** add person association ([5b4809a](https://github.com/c-commerce/charles-browser-sdk/commit/5b4809a6725eefe062a02e079c6a2694f7c31b59))

# [3.68.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.67.0...v3.68.0) (2021-01-25)


### Features

* **analytics:** add feed conversion ([f3de3ab](https://github.com/c-commerce/charles-browser-sdk/commit/f3de3ab649a381d2d8816424d64366d12f5b9efd))

# [3.67.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.66.4...v3.67.0) (2021-01-24)


### Bug Fixes

* **build:** disable env test ([73e95ef](https://github.com/c-commerce/charles-browser-sdk/commit/73e95eff7582477232c4052ff696d64c3352174b))
* more eslint chores ([aa88510](https://github.com/c-commerce/charles-browser-sdk/commit/aa88510f61d70ce014b26a52d2d6547b14a65c59))
* more linter chores ([7895ef6](https://github.com/c-commerce/charles-browser-sdk/commit/7895ef67c2797352fa0cc6b83186f53313aa68be))


### Features

* add knowledge bases ([fc373ea](https://github.com/c-commerce/charles-browser-sdk/commit/fc373ea6b470631d6a03a23edb4bc7b85dac7cd3))

## [3.66.4](https://github.com/c-commerce/charles-browser-sdk/compare/v3.66.3...v3.66.4) (2021-01-14)


### Bug Fixes

* **linter:** handle versioned regressions ([36d31aa](https://github.com/c-commerce/charles-browser-sdk/commit/36d31aaa1c57eb2a4013df781adadf94c616206b))

## [3.66.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.66.2...v3.66.3) (2021-01-07)


### Bug Fixes

* renovate typescript ([7895bc0](https://github.com/c-commerce/charles-browser-sdk/commit/7895bc021ee0a64fe963f72b276e787a6e77f5de))

## [3.66.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.66.1...v3.66.2) (2021-01-07)


### Bug Fixes

* upgrade typedoc ([88d6ddd](https://github.com/c-commerce/charles-browser-sdk/commit/88d6ddd41bb3126ded5b15382c2608b76c2cd6d7))

## [3.66.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.66.0...v3.66.1) (2021-01-07)


### Bug Fixes

* do not use yarn on remote ([365cdc8](https://github.com/c-commerce/charles-browser-sdk/commit/365cdc841f9e56e05ed145f6a581634962053324))

# [3.66.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.65.0...v3.66.0) (2021-01-07)


### Features

* upgrade mqtt ([5abde3b](https://github.com/c-commerce/charles-browser-sdk/commit/5abde3ba301fc557d2a4aa10a7c1da6342d61dad))

# [3.65.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.64.0...v3.65.0) (2021-01-07)


### Features

* upgrade http client ([0f7628a](https://github.com/c-commerce/charles-browser-sdk/commit/0f7628a843e85e056d99dadebea3ab4cc8984843))

# [3.64.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.63.1...v3.64.0) (2021-01-06)


### Features

* **dev/Notification/Campaign:** annotate types, remove publishing ([a4efd09](https://github.com/c-commerce/charles-browser-sdk/commit/a4efd09a779664209776cc8f37d495751c52fc2d))

## [3.63.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.63.0...v3.63.1) (2021-01-06)


### Bug Fixes

* **ContactList:** revert renaming ([f420d2b](https://github.com/c-commerce/charles-browser-sdk/commit/f420d2b4623635a8dae8465f75e27e63615ede15))

# [3.63.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.62.0...v3.63.0) (2021-01-06)


### Features

* **ContactList:** imeplement static entries bulk delete ([6baf047](https://github.com/c-commerce/charles-browser-sdk/commit/6baf0473056f57e3f49f507132e70a3010f40d4e))

# [3.62.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.61.1...v3.62.0) (2021-01-03)


### Features

* add favorites ([d2cc54b](https://github.com/c-commerce/charles-browser-sdk/commit/d2cc54b98e85bebb252d475063f01492a08dc996))

## [3.61.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.61.0...v3.61.1) (2020-12-31)


### Bug Fixes

* **product:** serialize links ([93df557](https://github.com/c-commerce/charles-browser-sdk/commit/93df5572e13b882041e8b817f9b29651e4c6b997))

# [3.61.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.60.0...v3.61.0) (2020-12-31)


### Features

* **product:** expose links ([1373b6c](https://github.com/c-commerce/charles-browser-sdk/commit/1373b6c7ffac4bf65430f7310eb26efd87165dc2))

# [3.60.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.59.2...v3.60.0) (2020-12-28)


### Features

* **dev:** export universe interfaces for better type support ([2231d1f](https://github.com/c-commerce/charles-browser-sdk/commit/2231d1f13b34e6331871a806f6aa6ba073b6dd65))

## [3.59.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.59.1...v3.59.2) (2020-12-25)


### Bug Fixes

* **notification_campaign:** serialise correctly in publish ([f02cf3b](https://github.com/c-commerce/charles-browser-sdk/commit/f02cf3b496db542bf0121fd48186b7fb1223117b))

## [3.59.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.59.0...v3.59.1) (2020-12-22)


### Bug Fixes

* **contact list preview:** use correct return type ([446dc4e](https://github.com/c-commerce/charles-browser-sdk/commit/446dc4e608f7ba1b9e8845024f000388957bc6d7))

# [3.59.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.58.0...v3.59.0) (2020-12-22)


### Features

* **notification campaigns:** add publish & test ([824bd54](https://github.com/c-commerce/charles-browser-sdk/commit/824bd54f2d0cd1f1c19cb696f8479a33ce8cafd8))

# [3.58.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.57.2...v3.58.0) (2020-12-21)


### Features

* **notification campaigns:** implement preflight check&arming ([e41985a](https://github.com/c-commerce/charles-browser-sdk/commit/e41985a75fc0584f36c5cea9a26c87547439bea4))

## [3.57.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.57.1...v3.57.2) (2020-12-21)


### Bug Fixes

* **notification campaigns:** add default language ([e620bf5](https://github.com/c-commerce/charles-browser-sdk/commit/e620bf5bb0aeb5fd3bd88611fadc74174620ce78))

## [3.57.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.57.0...v3.57.1) (2020-12-21)


### Bug Fixes

* **notification campaigns:** add isArmed & isDraft ([1c2daf6](https://github.com/c-commerce/charles-browser-sdk/commit/1c2daf6d65eaaa8bddaf707b8088e0aaab07089d))

# [3.57.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.56.0...v3.57.0) (2020-12-17)


### Features

* **contact lists:** add preview ([438dea1](https://github.com/c-commerce/charles-browser-sdk/commit/438dea19bec308f3d661b88d42a1018919919aa5))

# [3.56.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.55.0...v3.56.0) (2020-12-16)


### Features

* **universe/configurations:** refactor remote factory, add ui config ([5a3d8ad](https://github.com/c-commerce/charles-browser-sdk/commit/5a3d8ada1b8daa8bec1003ecdfd1f0c5e111295e))

# [3.55.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.54.0...v3.55.0) (2020-12-15)


### Features

* **contact list static entries:** implement delete ([8881d1c](https://github.com/c-commerce/charles-browser-sdk/commit/8881d1c1766d5741d231b11301cf4f173f981ca6))

# [3.54.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.53.0...v3.54.0) (2020-12-15)


### Features

* **contact lists:** implement contact lists & contact lists static entries ([bc021bd](https://github.com/c-commerce/charles-browser-sdk/commit/bc021bdfff0e045bc37b516ca08abcc2331b4afa))

# [3.53.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.52.0...v3.53.0) (2020-12-15)


### Features

* **universe:** implement self request ([2be6e06](https://github.com/c-commerce/charles-browser-sdk/commit/2be6e06e0c9404258800ce9b2d29c49a44052c9a))

# [3.52.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.51.0...v3.52.0) (2020-12-14)


### Features

* **notificationCampaigns:** add notification campaigns resource ([fdae5f8](https://github.com/c-commerce/charles-browser-sdk/commit/fdae5f8021cf775d19d8bc6c2660de4c903f912c))

# [3.51.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.50.1...v3.51.0) (2020-12-14)


### Features

* **contact lists:** add contact lists resource ([b363421](https://github.com/c-commerce/charles-browser-sdk/commit/b363421298ba0cbdfbe2789879443d1f93109207))

## [3.50.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.50.0...v3.50.1) (2020-12-10)


### Bug Fixes

* **universe/analytics:** use correct channel participation ref ([ab129d3](https://github.com/c-commerce/charles-browser-sdk/commit/ab129d3a148eb8e9fdc55b2564ac6a71e29bbb93))

# [3.50.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.49.0...v3.50.0) (2020-12-10)


### Features

* **universe/lists:** make templated requests ([b5d16fc](https://github.com/c-commerce/charles-browser-sdk/commit/b5d16fcd02c5c118ec9cfcec5e35d4595c26c42f))

# [3.49.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.48.0...v3.49.0) (2020-12-10)


### Features

* **universe/analytics:** move to templated requests ([30c47fe](https://github.com/c-commerce/charles-browser-sdk/commit/30c47fe89a939e851c3a948b2d3870ed435d784f))

# [3.48.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.47.1...v3.48.0) (2020-12-10)


### Features

* **universe/analytics:** suppport channel participation ([e68438e](https://github.com/c-commerce/charles-browser-sdk/commit/e68438ea5dc97fda22e899d76a55e35e94bed533))

## [3.47.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.47.0...v3.47.1) (2020-12-07)


### Bug Fixes

* **person:** add email & language preference ([1fff655](https://github.com/c-commerce/charles-browser-sdk/commit/1fff6557c5a778e3a198a48f4054341c08a52bb6))
* **person:** revert email (duplicate prop) ([50c7ea9](https://github.com/c-commerce/charles-browser-sdk/commit/50c7ea9083d8880ddae18e3b2318254c763f9a44))

# [3.47.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.46.0...v3.47.0) (2020-12-07)


### Features

* **universe:** added carts fetch count & orders accessor ([eae0a44](https://github.com/c-commerce/charles-browser-sdk/commit/eae0a445870a66eac438b15482505d682eb14c4b))

# [3.46.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.45.0...v3.46.0) (2020-12-03)


### Features

* **products:** implement fetch count ([6c16ad8](https://github.com/c-commerce/charles-browser-sdk/commit/6c16ad85a9ac93f14562669c52f11c9050ab51e4))

# [3.45.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.44.1...v3.45.0) (2020-12-02)


### Features

* **message-broker:** support broker notifications ([7e3e410](https://github.com/c-commerce/charles-browser-sdk/commit/7e3e410de8e2cbb53b0004eb245590114d127c4a))

## [3.44.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.44.0...v3.44.1) (2020-12-01)


### Bug Fixes

* **reply:** extend causes to callers correctly ([e55b880](https://github.com/c-commerce/charles-browser-sdk/commit/e55b8800b48384c63d1d9b33361cd05d6f204e78))

# [3.44.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.43.0...v3.44.0) (2020-12-01)


### Features

* **feed:** support .causes on reply ([c34270e](https://github.com/c-commerce/charles-browser-sdk/commit/c34270ef45e45dfa8f9d85866d821762d4aba2a2))

# [3.43.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.42.4...v3.43.0) (2020-12-01)


### Features

* **location:** handle can sell ([f2ee26a](https://github.com/c-commerce/charles-browser-sdk/commit/f2ee26a5ee7761d2f8376d251657acc2ccfd847c))

## [3.42.4](https://github.com/c-commerce/charles-browser-sdk/compare/v3.42.3...v3.42.4) (2020-11-30)


### Bug Fixes

* **message-templates:** prepare location picker & carousel ([7497a57](https://github.com/c-commerce/charles-browser-sdk/commit/7497a57045a62d957a0ff00bb9551a7cd687bbf8))

## [3.42.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.42.2...v3.42.3) (2020-11-30)


### Bug Fixes

* **entity:** allign correct error for delete ([7379a4a](https://github.com/c-commerce/charles-browser-sdk/commit/7379a4a48ae5b1234d1a8e1d11391088fda5daad))

## [3.42.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.42.1...v3.42.2) (2020-11-27)


### Bug Fixes

* **universe:** fix base apirequest class ([41b9015](https://github.com/c-commerce/charles-browser-sdk/commit/41b9015baf0b7d044c997589ac5f41db18abc7b5))

## [3.42.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.42.0...v3.42.1) (2020-11-26)


### Bug Fixes

* **product category trees:** add storefront ([e528be9](https://github.com/c-commerce/charles-browser-sdk/commit/e528be9030719a1c9d090809e92b6c009dd32a0f))

# [3.42.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.41.1...v3.42.0) (2020-11-26)


### Features

* **product-category:** support storefront ref ([aad15e5](https://github.com/c-commerce/charles-browser-sdk/commit/aad15e591368a40aaf9a9e87c61d9ea1530b7c2f))
* **storefront:** support product category sync ([bad2e9c](https://github.com/c-commerce/charles-browser-sdk/commit/bad2e9cd77126da29a2dbdeb77d7ca8fdf278a73))

## [3.41.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.41.0...v3.41.1) (2020-11-26)


### Bug Fixes

* **product categories:** add missing properties ([7d6c0cf](https://github.com/c-commerce/charles-browser-sdk/commit/7d6c0cf5a0520e2aae95a166d02a228fa12f55ef))
* **product category trees:** add missing properties ([1ce9374](https://github.com/c-commerce/charles-browser-sdk/commit/1ce9374cdbc1f4fdb540c39c44298cea9bb49f9b))

# [3.41.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.40.1...v3.41.0) (2020-11-25)


### Features

* **message-broker:** parse external reference id ([207d2f7](https://github.com/c-commerce/charles-browser-sdk/commit/207d2f777e793a560453185e1943fb267444b664))

## [3.40.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.40.0...v3.40.1) (2020-11-19)


### Bug Fixes

* **universe:** add message factory ([97a16b2](https://github.com/c-commerce/charles-browser-sdk/commit/97a16b26e746f6f963381601121fb95b2365e047))

# [3.40.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.39.1...v3.40.0) (2020-11-19)


### Features

* **Nlus:** implement sync intents ([4f8a661](https://github.com/c-commerce/charles-browser-sdk/commit/4f8a661b772bf6a88060b8e2070a35faf0919f4c))

## [3.39.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.39.0...v3.39.1) (2020-11-18)


### Bug Fixes

* **message-template:** reference replies correctly ([be80b4a](https://github.com/c-commerce/charles-browser-sdk/commit/be80b4a83d037b8bf1fe2d06f60c021c8240907e))

# [3.39.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.38.0...v3.39.0) (2020-11-11)


### Features

* **message:** allow entity functionality ([bf8047c](https://github.com/c-commerce/charles-browser-sdk/commit/bf8047cbbc802334e808ed0dbcf17d670a4e7052))

# [3.38.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.37.0...v3.38.0) (2020-11-05)


### Features

* **storefront:** implement sync locations ([19ccfe9](https://github.com/c-commerce/charles-browser-sdk/commit/19ccfe9304c2d99846b6a37638579672cb85f668))

# [3.37.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.36.4...v3.37.0) (2020-11-05)


### Features

* **locations:** add resource locations ([48f51ca](https://github.com/c-commerce/charles-browser-sdk/commit/48f51caed5c2e967e2d3994edc69aa94b8225b55))

## [3.36.4](https://github.com/c-commerce/charles-browser-sdk/compare/v3.36.3...v3.36.4) (2020-11-05)


### Bug Fixes

* **assets:** expose optim ([f51005c](https://github.com/c-commerce/charles-browser-sdk/commit/f51005c4d4ba7f1769e642062f4d94cfe6ba6cca))

## [3.36.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.36.2...v3.36.3) (2020-11-05)


### Bug Fixes

* **asset:** align compat key to api ([d961d93](https://github.com/c-commerce/charles-browser-sdk/commit/d961d938de8bcae69e25b81ab32c5905b0e328b1))

## [3.36.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.36.1...v3.36.2) (2020-11-05)


### Bug Fixes

* **assets:** harmonize query options ([3f3e042](https://github.com/c-commerce/charles-browser-sdk/commit/3f3e042c7b2128d770d19b07abdb69d5ebbf272a))

## [3.36.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.36.0...v3.36.1) (2020-11-05)


### Bug Fixes

* **assets:** allow override of .public, add optimisations ([3d3c10f](https://github.com/c-commerce/charles-browser-sdk/commit/3d3c10fcfb86dc933aade1f3c1636f3baa12259d))

# [3.36.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.35.0...v3.36.0) (2020-11-03)


### Features

* **base:** add put, save put ([7252f4e](https://github.com/c-commerce/charles-browser-sdk/commit/7252f4ee866f11f580c7e1d0eea8f030ca0b50e4))

# [3.35.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.34.0...v3.35.0) (2020-10-29)


### Features

* add intents ([306cb07](https://github.com/c-commerce/charles-browser-sdk/commit/306cb07aa9e93b3244a07bec04ead2506da222b6))

# [3.34.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.33.0...v3.34.0) (2020-10-28)


### Features

* **universe:** add nlus ([66c6c46](https://github.com/c-commerce/charles-browser-sdk/commit/66c6c463f8f7b807c99f1317ea41efe90433e0b4))

# [3.33.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.32.1...v3.33.0) (2020-10-22)


### Features

* **Person:** added default_address to person and person payloads ([199a917](https://github.com/c-commerce/charles-browser-sdk/commit/199a9178b832649d3bc30a4756f22d6356e386f4))

## [3.32.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.32.0...v3.32.1) (2020-10-22)


### Bug Fixes

* **message templates:** add attachment types & smart variable support ([1ea8c1a](https://github.com/c-commerce/charles-browser-sdk/commit/1ea8c1ae85e6b4979bc9c3bd57b9e0f56f2250c8))

# [3.32.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.31.0...v3.32.0) (2020-10-21)


### Features

* **person:** add get gdpr info ([123be67](https://github.com/c-commerce/charles-browser-sdk/commit/123be672fe9213deb7bdac0ba51fcef89d880251))

# [3.31.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.30.0...v3.31.0) (2020-10-20)


### Features

* **universe:** make healthz, versions requests ([b292ad4](https://github.com/c-commerce/charles-browser-sdk/commit/b292ad4e14bd3d29ffacb9235c0ab28e6318defc))

# [3.30.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.29.2...v3.30.0) (2020-10-18)


### Features

* **message broker:** message sync for specific channeluser ([01d687e](https://github.com/c-commerce/charles-browser-sdk/commit/01d687e18af2af114878a52d9d25cae31fcd5f1f))

## [3.29.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.29.1...v3.29.2) (2020-10-09)


### Bug Fixes

* **feed/messages/status:** handle regex correctly, do not fan status out prematurely ([7202b67](https://github.com/c-commerce/charles-browser-sdk/commit/7202b6752995e220e73eba5fce7324eb105c5a34))

## [3.29.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.29.0...v3.29.1) (2020-10-09)


### Bug Fixes

* **feed:** document msg status ([2305364](https://github.com/c-commerce/charles-browser-sdk/commit/230536480aad93cd34f138f70862a4bf19a35a58))

# [3.29.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.28.0...v3.29.0) (2020-10-09)


### Features

* **feed:** expose message status change event ([b1be9ef](https://github.com/c-commerce/charles-browser-sdk/commit/b1be9ef81b51b9dbfdc02b73574d691538d09c03))

# [3.28.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.27.1...v3.28.0) (2020-10-06)


### Bug Fixes

* **message template:** fix i18n schema ([3e11ca1](https://github.com/c-commerce/charles-browser-sdk/commit/3e11ca162f2abcc657e04f0b9467467eee2356a5))


### Features

* **message templates:** add status and rejection reason ([12d0331](https://github.com/c-commerce/charles-browser-sdk/commit/12d0331828293c77ebcefffaad17d6f6b444715a))

## [3.27.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.27.0...v3.27.1) (2020-10-05)


### Bug Fixes

* **staff:** pass firstname for invite mail ([8c27d2d](https://github.com/c-commerce/charles-browser-sdk/commit/8c27d2d8c5a38f4b6a518ca7cdb16370e8cbd09e))

# [3.27.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.26.0...v3.27.0) (2020-10-05)


### Features

* **Cart / Orders:** Added taxesSummary to carts and orders ([52a9d84](https://github.com/c-commerce/charles-browser-sdk/commit/52a9d840fde4715b4a6aa66edfb77bdedbe9d388))

# [3.26.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.5...v3.26.0) (2020-10-02)


### Features

* **person:** add merge ([1111d67](https://github.com/c-commerce/charles-browser-sdk/commit/1111d679a0e6e5877a6d426391aba8b78dc2ebe3))

## [3.25.5](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.4...v3.25.5) (2020-09-24)


### Bug Fixes

* **asset:** fix param stringifying ([4e26712](https://github.com/c-commerce/charles-browser-sdk/commit/4e267129711cb2650f2d58b1b5ceed13f7231cce))

## [3.25.4](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.3...v3.25.4) (2020-09-24)


### Bug Fixes

* **asset:** fix upload and transform method ([60bd373](https://github.com/c-commerce/charles-browser-sdk/commit/60bd37329cbf9d21e10ae4caea7814f1bdc3f8a3))

## [3.25.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.2...v3.25.3) (2020-09-24)


### Bug Fixes

* **assets:** move upload method to asset ([11ba749](https://github.com/c-commerce/charles-browser-sdk/commit/11ba7495f52cae433a64672e8953bf2efeab6051))

## [3.25.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.1...v3.25.2) (2020-09-24)


### Bug Fixes

* **assets:** adjust upload and transform method to support other content types ([600a7b5](https://github.com/c-commerce/charles-browser-sdk/commit/600a7b512a6b13f0894c42836a437167dab8b544))

## [3.25.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.25.0...v3.25.1) (2020-09-23)


### Bug Fixes

* **asset:** fix uploadAndTransform to handle transform param correctly ([fc0bb16](https://github.com/c-commerce/charles-browser-sdk/commit/fc0bb16f08bab3b48167202e6c07539a574f3aac))

# [3.25.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.24.3...v3.25.0) (2020-09-23)


### Features

* **asset:** add upload and transform capability ([639d2bd](https://github.com/c-commerce/charles-browser-sdk/commit/639d2bd8081119b37a28c765110b2fbddf128d06))

## [3.24.3](https://github.com/c-commerce/charles-browser-sdk/compare/v3.24.2...v3.24.3) (2020-09-22)


### Bug Fixes

* **ChannelUser:** added personal user info as top level properties ([5d57584](https://github.com/c-commerce/charles-browser-sdk/commit/5d57584550b0b3b840ab4690636b4b8fe191ef55))

## [3.24.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.24.1...v3.24.2) (2020-09-22)


### Bug Fixes

* **person:** fallback virtual properties correctly ([72d4196](https://github.com/c-commerce/charles-browser-sdk/commit/72d419644397e791036f15dec662894d171b118a))

## [3.24.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.24.0...v3.24.1) (2020-09-21)


### Bug Fixes

* **message templates:** fix submit method ([0b26158](https://github.com/c-commerce/charles-browser-sdk/commit/0b2615806eebaebeff27bb2d8f71514cad2aff65))

# [3.24.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.23.0...v3.24.0) (2020-09-21)


### Features

* **message template:** add submit method ([c3bd455](https://github.com/c-commerce/charles-browser-sdk/commit/c3bd455b4551796602fe07aa33d5784c92bcbb14))

# [3.23.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.22.1...v3.23.0) (2020-09-18)


### Features

* **message broker:** add profile, update profile, getprofile ([b6851a7](https://github.com/c-commerce/charles-browser-sdk/commit/b6851a7e3e70ada64b4d85b64877bb36f4206778))

## [3.22.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.22.0...v3.22.1) (2020-09-17)


### Bug Fixes

* **Person:** fixed missing person property on address.serialize ([2e06850](https://github.com/c-commerce/charles-browser-sdk/commit/2e06850b52f36428d2d99113a4ad97a74c35751f))

# [3.22.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.21.0...v3.22.0) (2020-09-17)


### Features

* **Cart:** added personExternalReferenceId ([0606c82](https://github.com/c-commerce/charles-browser-sdk/commit/0606c82e05d4a8685ae9313d7daa8f6e095d78b6))

# [3.21.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.20.0...v3.21.0) (2020-09-17)


### Features

* **Person Address:** Better address support ([c189fe8](https://github.com/c-commerce/charles-browser-sdk/commit/c189fe8561deef2a1d7aa6b53c39a3db6f28d460))

# [3.20.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.19.0...v3.20.0) (2020-09-17)


### Features

* **Cart:** better address support ([77147dc](https://github.com/c-commerce/charles-browser-sdk/commit/77147dceda629aaa9b1b860dc27be1f2820621a3))

# [3.19.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.18.0...v3.19.0) (2020-09-16)


### Features

* **Cart:** added shipping methods ([cdbde97](https://github.com/c-commerce/charles-browser-sdk/commit/cdbde976cdb9a33c4e136a4bf9763e67d0928435))

# [3.18.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.17.0...v3.18.0) (2020-09-16)


### Bug Fixes

* **message templates:** fix content category property ([1fe8696](https://github.com/c-commerce/charles-browser-sdk/commit/1fe86963973e0e1dce162ef78cabbe8ccdccf418))


### Features

* **message templates:** add content category ([db95895](https://github.com/c-commerce/charles-browser-sdk/commit/db9589599989f0a3a4aa1643719f396e8f514ae3))

# [3.17.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.16.0...v3.17.0) (2020-09-14)


### Features

* **Universe Tracks:** Universe tracks accessor (fetch all/current, etc) ([937491c](https://github.com/c-commerce/charles-browser-sdk/commit/937491c7dac6849f4df83794d85f330abce07659))

# [3.16.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.15.0...v3.16.0) (2020-09-14)


### Features

* **package.json:** lower jest coverage threshold and trigger build ([5a963ee](https://github.com/c-commerce/charles-browser-sdk/commit/5a963ee9f05de8f5794d700c8046d37ff512bac0))
* **Tracks:** implemented universe tracks entity ([0c16c17](https://github.com/c-commerce/charles-browser-sdk/commit/0c16c1722096975a847deb1dc49ddec0cfeab7fa))

# [3.15.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.14.1...v3.15.0) (2020-09-07)


### Features

* **universe/analytics:** implement convo count ([1e6ff1f](https://github.com/c-commerce/charles-browser-sdk/commit/1e6ff1f95bb36b9b56983cc12dddd41cd185871a))

## [3.14.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.14.0...v3.14.1) (2020-08-30)


### Bug Fixes

* Revert "feat(pkg): move base into dist" ([070077a](https://github.com/c-commerce/charles-browser-sdk/commit/070077a4f47471c11e08f41f4f7930803f51fadc))

# [3.14.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.13.0...v3.14.0) (2020-08-30)


### Features

* **pkg:** move base into dist ([985f48e](https://github.com/c-commerce/charles-browser-sdk/commit/985f48eff549a5af00a88944734fcf3551634cf3))

# [3.13.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.12.1...v3.13.0) (2020-08-30)


### Features

* **universe:** allow making unimplemented api calls ([f1521b1](https://github.com/c-commerce/charles-browser-sdk/commit/f1521b1441b09d81474dd3ad8dbc8da548e59521))

## [3.12.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.12.0...v3.12.1) (2020-08-24)


### Bug Fixes

* **things:** forward payload ([24a442b](https://github.com/c-commerce/charles-browser-sdk/commit/24a442bea963ff508e9f2792a013ae2c49b1cec1))

# [3.12.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.11.0...v3.12.0) (2020-08-23)


### Features

* **Cart:** added links to cart ([78f6921](https://github.com/c-commerce/charles-browser-sdk/commit/78f692170dbc77d518deff8cd3f9f76680e9b861))

# [3.11.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.10.0...v3.11.0) (2020-08-21)


### Features

* add things ([b3a17a0](https://github.com/c-commerce/charles-browser-sdk/commit/b3a17a00017d2baa6b9bffbc3752a9b4caac806c))

# [3.10.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.9.0...v3.10.0) (2020-08-20)


### Features

* **configurations:** move ooo to event routes ([8393ed0](https://github.com/c-commerce/charles-browser-sdk/commit/8393ed0dfa5a55f82e809eb351461f9328f95722))

# [3.9.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.8.0...v3.9.0) (2020-08-17)


### Features

* **configuration:** add ooo ([4b79636](https://github.com/c-commerce/charles-browser-sdk/commit/4b796363aa23f11caa5384648d3bb8dee7b0b915))

# [3.8.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.7.0...v3.8.0) (2020-08-11)


### Features

* **Universe/Analytics:** Implemented analytic reports ([de4223a](https://github.com/c-commerce/charles-browser-sdk/commit/de4223af977c0c6ac1178f76e1c395bfb6aad7bd))

# [3.7.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.6.0...v3.7.0) (2020-08-07)


### Features

* add routes ([ad19d53](https://github.com/c-commerce/charles-browser-sdk/commit/ad19d5349ae56062989b87067e020130d511791f))

# [3.6.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.5.0...v3.6.0) (2020-08-07)


### Features

* **message-brokers:** add chennl fetch ([9bd0b26](https://github.com/c-commerce/charles-browser-sdk/commit/9bd0b2674f09fdd4a2a3f5a84a691a098e699c24))

# [3.5.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.4.0...v3.5.0) (2020-08-06)


### Features

* **person:** implement delete gdpr ([6565cf9](https://github.com/c-commerce/charles-browser-sdk/commit/6565cf9628aa152343b5a1245d056d5ac07021c8))

# [3.4.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.3.2...v3.4.0) (2020-08-03)


### Features

* **integrations:** add vendor specific setup of integration ([b95b29f](https://github.com/c-commerce/charles-browser-sdk/commit/b95b29f5a2385c19d284bcc219c1f7d076cd60c8))

## [3.3.2](https://github.com/c-commerce/charles-browser-sdk/compare/v3.3.1...v3.3.2) (2020-08-03)


### Bug Fixes

* **integration:** available integration - add setup endpoint property ([57299c8](https://github.com/c-commerce/charles-browser-sdk/commit/57299c8a3120bddee8ce6da15e8bd8a9ffd3fbef))

## [3.3.1](https://github.com/c-commerce/charles-browser-sdk/compare/v3.3.0...v3.3.1) (2020-07-30)


### Bug Fixes

* **global:** trigger build ([737b1d4](https://github.com/c-commerce/charles-browser-sdk/commit/737b1d4bf5d127285ee849d4e51666b283109fde))

# [3.3.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.2.0...v3.3.0) (2020-07-30)


### Bug Fixes

* **storefront:** add setup ([adc905e](https://github.com/c-commerce/charles-browser-sdk/commit/adc905e72442deab6ed8613870f990d67ea19389))


### Features

* **message brokers:** add setup & messages sync ([b6c9058](https://github.com/c-commerce/charles-browser-sdk/commit/b6c9058dae80dd2e1b022650142d452495a7f1d7))

# [3.2.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.1.0...v3.2.0) (2020-07-30)


### Features

* **storefront:** added products, orders & inventories sync ([01ee1cd](https://github.com/c-commerce/charles-browser-sdk/commit/01ee1cd7cfe6f5eed3e52cd4c5456b7029c4628d))

# [3.1.0](https://github.com/c-commerce/charles-browser-sdk/compare/v3.0.0...v3.1.0) (2020-07-28)


### Features

* **person:** add new analytics embed support ([0151708](https://github.com/c-commerce/charles-browser-sdk/commit/01517080cc7fa69f46cb07e6fa772132d25ca276))

# [3.0.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.90.1...v3.0.0) (2020-07-28)


### Bug Fixes

* **channeluser:** add links property ([87f4fdb](https://github.com/c-commerce/charles-browser-sdk/commit/87f4fdb2b52fb026ba6476e7aeb90a6cab8e7ed7))
* **person:** remove analytics snapshot support ([1adcd8d](https://github.com/c-commerce/charles-browser-sdk/commit/1adcd8dfbec95f6000d087324e6ecd0f30e00220))


### BREAKING CHANGES

* **person:** old snapshot analytics will not work anymore on person

## [2.90.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.90.0...v2.90.1) (2020-07-17)


### Bug Fixes

* **person:** add analytics embed in init ([11108ef](https://github.com/c-commerce/charles-browser-sdk/commit/11108efd0fa1c83e51be2600ce4dd60721be5334))

# [2.90.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.89.0...v2.90.0) (2020-07-14)


### Features

* **person:** add orders accessor ([6e6ad1f](https://github.com/c-commerce/charles-browser-sdk/commit/6e6ad1f0df9d475a58fbdb73d23a8a6ab33cf7a0))

# [2.89.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.88.1...v2.89.0) (2020-07-11)


### Features

* **commerce:** add shipping methods ([d174738](https://github.com/c-commerce/charles-browser-sdk/commit/d174738785cd45f4c7adb242dea6fe9e4aa61493))

## [2.88.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.88.0...v2.88.1) (2020-07-08)


### Bug Fixes

* move credentials to options ([e6d9691](https://github.com/c-commerce/charles-browser-sdk/commit/e6d96913ed8292f571a2717269242521577d937c))

# [2.88.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.87.1...v2.88.0) (2020-07-08)


### Features

* force credentials in all the accessors ([1f7c7b3](https://github.com/c-commerce/charles-browser-sdk/commit/1f7c7b344bd704a747486f3a51850c0bb5290f2c))

## [2.87.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.87.0...v2.87.1) (2020-07-06)


### Bug Fixes

* **feed:** added open parameter to feed.serialize() ([1cb500a](https://github.com/c-commerce/charles-browser-sdk/commit/1cb500a88c137f308eafa70348a9f3fc8b2ad2d3))

# [2.87.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.86.0...v2.87.0) (2020-07-05)


### Features

* **staff:** add user invite ([c4f631b](https://github.com/c-commerce/charles-browser-sdk/commit/c4f631bc336e8a7649271c64385d2f7cd5319d00))

# [2.86.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.85.0...v2.86.0) (2020-07-03)


### Features

* **Storefront:** Add storefronts ([b388efb](https://github.com/c-commerce/charles-browser-sdk/commit/b388efbd479a8a98fa106ff569ff8b6817a9404c))

# [2.85.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.84.0...v2.85.0) (2020-07-03)


### Bug Fixes

* **Feed:** Fixed random error (maybe merge issue) ([2ff44d5](https://github.com/c-commerce/charles-browser-sdk/commit/2ff44d5c69adc5c23fd74e13e7f2fccce591d7d7))


### Features

* **feed:** make feeds countable ([360835e](https://github.com/c-commerce/charles-browser-sdk/commit/360835e2bf11cb0ea994a95bccf23fa9786decf7))
* **Person:** Added company to person address ([88983a7](https://github.com/c-commerce/charles-browser-sdk/commit/88983a7237a9128cff7ec4d2ed836535e7d54dd4))

# [2.84.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.83.1...v2.84.0) (2020-07-02)


### Features

* make withCredentials optional ([60a582a](https://github.com/c-commerce/charles-browser-sdk/commit/60a582a41664c90a383ba0a3ee1665e4f6b468c4))

## [2.83.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.83.0...v2.83.1) (2020-07-02)


### Reverts

* Revert "feat(client): utilise cookies" ([8408e4f](https://github.com/c-commerce/charles-browser-sdk/commit/8408e4f22c5a1b79ae6ec5086bd9ce6ac0143767))

# [2.83.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.82.0...v2.83.0) (2020-07-02)


### Features

* **MessageBroker:** Add Message Broker & Message Templates Sync Mechanism ([a616db6](https://github.com/c-commerce/charles-browser-sdk/commit/a616db6f760ce102aa5c8fcede613e9577953aba))

# [2.82.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.81.0...v2.82.0) (2020-07-02)


### Features

* **client:** utilise cookies ([7d6f43a](https://github.com/c-commerce/charles-browser-sdk/commit/7d6f43a96c7deaf52a86ed0d52c505df51aa45be))

# [2.81.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.80.2...v2.81.0) (2020-06-28)


### Features

* **people:** move to be accessor, add count ([c4269ec](https://github.com/c-commerce/charles-browser-sdk/commit/c4269ecb21d1fce703d8480de9eb1d53a19b2816))

## [2.80.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.80.1...v2.80.2) (2020-06-28)


### Bug Fixes

* **feed:** add answered to feed.serialize() ([21f7da7](https://github.com/c-commerce/charles-browser-sdk/commit/21f7da7df7cb06c53c189632643fdbfc980838e2))

## [2.80.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.80.0...v2.80.1) (2020-06-26)


### Bug Fixes

* **feed:** add answered ([134f26c](https://github.com/c-commerce/charles-browser-sdk/commit/134f26ca31e2698b08c388bd0d34aafeafc872fb))

# [2.80.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.5...v2.80.0) (2020-06-25)


### Features

* **feed:** add open ([8acab07](https://github.com/c-commerce/charles-browser-sdk/commit/8acab079effbb0d23f4ba416e883fdbc6a7f56bf))

## [2.79.5](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.4...v2.79.5) (2020-06-24)


### Bug Fixes

* **feed:** add author to create feedComment ([e330dfd](https://github.com/c-commerce/charles-browser-sdk/commit/e330dfd9ef3af947ff7a2447dc3e337385671cde))

## [2.79.4](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.3...v2.79.4) (2020-06-23)


### Bug Fixes

* **inventory:** add qty ([234633a](https://github.com/c-commerce/charles-browser-sdk/commit/234633a121e0ee13f6f8f1bb39c2f1ea3b95b025))

## [2.79.3](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.2...v2.79.3) (2020-06-19)


### Bug Fixes

* **Feed:** Handle incoming presence and typing events ([7dd5d67](https://github.com/c-commerce/charles-browser-sdk/commit/7dd5d67fd6efd56bac0353b4af6360b16f3e6f10))

## [2.79.2](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.1...v2.79.2) (2020-06-18)


### Bug Fixes

* **Events:** Added suggestions ([2d8e493](https://github.com/c-commerce/charles-browser-sdk/commit/2d8e4936dd2bfbbe8576d48fa8a8037f84c24924))

## [2.79.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.79.0...v2.79.1) (2020-06-18)


### Bug Fixes

* **Feed:** Allow EntityFetchOptions on feed.init ([cc17387](https://github.com/c-commerce/charles-browser-sdk/commit/cc17387d41f7861270f859453481515e88ebbe18))

# [2.79.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.78.1...v2.79.0) (2020-06-16)


### Features

* add integrations ([ec3edbd](https://github.com/c-commerce/charles-browser-sdk/commit/ec3edbd6cac1a68b0cc5235561323965d7c0954c))

## [2.78.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.78.0...v2.78.1) (2020-06-16)


### Bug Fixes

* **sdk:** expose mqttUniverseBase ([e7d97d8](https://github.com/c-commerce/charles-browser-sdk/commit/e7d97d807a23a50cd6c142547fbc450080cd0fce))

# [2.78.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.77.0...v2.78.0) (2020-06-16)


### Features

* **dev:** allow overriding universe base ([9473746](https://github.com/c-commerce/charles-browser-sdk/commit/94737462d48a5c9e19fe0d519f11040645c6ff25))

# [2.77.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.76.0...v2.77.0) (2020-06-15)


### Features

* **feed:** implement hidden ([2df6839](https://github.com/c-commerce/charles-browser-sdk/commit/2df68396cd667afe64cfd38a26b56e7119b28ccd))

# [2.76.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.75.0...v2.76.0) (2020-06-14)


### Features

* **products:** add inventory ([a2d7b24](https://github.com/c-commerce/charles-browser-sdk/commit/a2d7b2418f8cae7a455bed761527fdb2684fddf3))

# [2.75.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.74.0...v2.75.0) (2020-06-12)


### Features

* **feed:** add typing and presence ([a4eed2d](https://github.com/c-commerce/charles-browser-sdk/commit/a4eed2dee2523724d65c00e72e30815ae492fce8))


### Reverts

* **universe:** do not get unnecessary config ([8898d11](https://github.com/c-commerce/charles-browser-sdk/commit/8898d1127538076d051f7f6d78b4500daab5d738))

# [2.74.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.73.1...v2.74.0) (2020-06-12)


### Features

* **client:** set default accept ([9b1fa9b](https://github.com/c-commerce/charles-browser-sdk/commit/9b1fa9b5e2b4bbb79725ce39f414ac761e654032))
* **universe:** init with config ([3acae5a](https://github.com/c-commerce/charles-browser-sdk/commit/3acae5a949c0780cdee5e5674331ef823e43ad7f))

## [2.73.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.73.0...v2.73.1) (2020-06-08)


### Bug Fixes

* **MessageTemplate:** Add notification flag ([49a921f](https://github.com/c-commerce/charles-browser-sdk/commit/49a921fe6d0187eb466513241e9f64d6c76953cc))

# [2.73.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.72.0...v2.73.0) (2020-06-07)


### Features

* **configuration:** add configurations ([a3c1581](https://github.com/c-commerce/charles-browser-sdk/commit/a3c1581e99564db8d696dc09e6424b9cc95b4b15))

# [2.72.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.71.1...v2.72.0) (2020-06-05)


### Features

* **message:** add author ([9034654](https://github.com/c-commerce/charles-browser-sdk/commit/9034654ebea68c08ca8a2f1997d11efc36a1a460))

## [2.71.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.71.0...v2.71.1) (2020-06-03)


### Bug Fixes

* **Staff:** Add fields gender, user, roles & permissions ([e2b9ebd](https://github.com/c-commerce/charles-browser-sdk/commit/e2b9ebdd36a58360d971fbf4f0cf7a8ec5ddc1f0))

# [2.71.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.70.1...v2.71.0) (2020-05-29)


### Features

* **build:** use tslib for smaller build ([6ae6ca1](https://github.com/c-commerce/charles-browser-sdk/commit/6ae6ca1beceaaf3ce51136341d46918d5156d21b))

## [2.70.1](https://github.com/c-commerce/charles-browser-sdk/compare/v2.70.0...v2.70.1) (2020-05-27)


### Bug Fixes

* **TagGroups:** Fix endpoint ([2737b31](https://github.com/c-commerce/charles-browser-sdk/commit/2737b311af1101eafc51435bb10a7216dcaedc7f))

# [2.70.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.69.0...v2.70.0) (2020-05-27)


### Features

* add tag groups ([4b6c06d](https://github.com/c-commerce/charles-browser-sdk/commit/4b6c06d7c1c3e42a12969e69c33d0342fb118f35))

# [2.69.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.68.0...v2.69.0) (2020-05-21)


### Features

* **Asset:** Upload Assets ([21515a1](https://github.com/c-commerce/charles-browser-sdk/commit/21515a1895c1b2014fd571bf1474f7500c8d31c1))

# [2.68.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.67.0...v2.68.0) (2020-05-19)


### Features

* **universe:** expose entity fetch options in some ([650dca5](https://github.com/c-commerce/charles-browser-sdk/commit/650dca5c08540b7b178427a2d38030ed3e6eb993))

# [2.67.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.66.0...v2.67.0) (2020-05-17)


### Features

* **universe:** add products search ([89a26b7](https://github.com/c-commerce/charles-browser-sdk/commit/89a26b7630dd04a2c51e1b9cae313242fe97ae1a))

# [2.66.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.65.0...v2.66.0) (2020-05-17)


### Features

* add tags ([00ca2b4](https://github.com/c-commerce/charles-browser-sdk/commit/00ca2b45bc72c004534f7ada9cb5c21aab323d0d))

# [2.65.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.64.0...v2.65.0) (2020-05-12)


### Features

* **sdk:** make universe inittable with different base ([d6e85f3](https://github.com/c-commerce/charles-browser-sdk/commit/d6e85f3d3f6a90bd3abc70d7a4866eb6e6f98763))

# [2.64.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.63.0...v2.64.0) (2020-05-06)


### Features

* **Feed:** Comment Event for feed ([c1d9011](https://github.com/c-commerce/charles-browser-sdk/commit/c1d901197f5ba4e34a18230446018f5851a26b37))

# [2.63.0](https://github.com/c-commerce/charles-browser-sdk/compare/v2.62.0...v2.63.0) (2020-05-06)


### Features

* **Universe:** Emit api/people event ([34f2d9f](https://github.com/c-commerce/charles-browser-sdk/commit/34f2d9f88cfc88bdc7a7a2f4150861ee73e73a26))

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
