import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
// import * as universe from '../../src/universe/index'
import { stubUniverse } from '../util'
import { Cart, CartItem } from '../../src/entities/cart/cart'

// const legacyId = '4564'

const mock = new MockAdapter(axios)

describe('v0: Cart: can handle cart', () => {
  beforeEach(() => {
    mock.reset()
    mock.resetHandlers()
  })

  it('Charles\'s Cart is instantiable', async () => {
    mock
      .onPatch(`https://stub-universe.hello-charles.com/api/v0/carts/pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx`)
      .reply(function (config) {
        return [
          200,
          {
            data: [
              {
                id: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
                proxy_vendor: 'shopify',
                is_proxy: true,
                name: 'My first cart',
                created_at: '2020-04-15T22:29:31.065Z',
                updated_at: '2020-04-15T22:29:31.065Z',
                deleted: false,
                active: true,
                custom_id: null,
                type: 'sale',
                external_reference_id: '551644692617',
                external_reference_custom_id: null,
                client_id: null,
                person: null,
                note: null,
                comment: null,
                shipping_address: null,
                billing_address: null,
                contact: null,
                metadata: null,
                custom_properties: null,
                proxy_payload: null,
                shipping_fulfillment: null,
                amount_total_gross: 30.99,
                amount_total_net: 26.04,
                amount_total_tax: 4.95,
                amount_total_shipping_gross: null,
                order_prompt: 'https://hey-charles-dev-store.myshopify.com/XXXXXXXX/invoices/XXXXXXXXXXX',
                status: 'open',
                items: [
                  {
                    qty: 1,
                    sku: null,
                    name: 'T-Shirt xl',
                    amount: {
                      net: null,
                      gross: 30.99
                    },
                    product: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
                    currency: 'EUR',
                    vat_rate: 0.19,
                    sub_title: 'T-Shirt xl',
                    vat_class: null,
                    custom_vat_rate: null,
                    shipping_required: false,
                    product_external_reference_id: null
                  }
                ]
              }
            ]
          }
        ]
      })

    const universeStub = stubUniverse()

    const externalStateCart = {
      id: 'pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx',
      proxy_vendor: 'shopify',
      is_proxy: true,
      name: 'My first cart',
      items: undefined as object[] | undefined
    }

    const carts = universeStub.universe.carts.fromJson([externalStateCart])
    const cart = carts[0]

    expect(cart).toBeDefined()
    expect(cart).toBeInstanceOf(Cart)
    expect(cart.isProxy).toBe(true)
    expect(cart.proxyVendor).toBe('shopify')
    expect(cart.items).toStrictEqual([])

    externalStateCart.items = [
      {
        qty: 1,
        product: 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
      }
    ]

    await cart.patch(externalStateCart)

    expect(cart).toBeDefined()
    expect(cart).toBeInstanceOf(Cart)
    expect(cart.isProxy).toBe(true)
    expect(cart.proxyVendor).toBe('shopify')
    expect(cart.items.length).toBe(1)

    const cartItem = cart.items[0]
    expect(cartItem).toBeInstanceOf(CartItem)
    expect(cartItem.product).toBe('pxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx')
    expect(cartItem.qty).toBe(1)
    expect(cartItem.amount).toBeDefined()
    expect(cartItem.amount.gross).toEqual(30.99)
  })
})
