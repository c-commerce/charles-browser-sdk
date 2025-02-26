
### What to do with the Browser SDK

The SDK is an API Abstraction layer between the backend and the UI. We must avoid putting business logic inside the SDK. We should use it to ensure parity between entities on the backend and the SDK to ensure a good developer experience.

Example of abstraction:

```ts
export default { 
   fetchCount: async (options?: UniverseFetchOptions): Promise<{ count: number }> => {
        try {
          const opts = {
            method: 'HEAD',
            url: `${this.universeBase}/${Feeds.endpoint}`,
            params: {
              ...(options?.query ?? {})
            }
          }

          const res = await this.http.getClient()(opts)

          return {
            count: Number(res.headers['X-Resource-Count'] || res.headers['x-resource-count'])
          }
        } catch (err) {
          throw new FeedFetchCountRemoteError(undefined, { error: err })
        }
      },
}

```

### Caveats

* Avoid adding business logic that is beyond making requests to the API and transforming the data we get as response
* Avoid adding wrapper methods that call existing methods with some specific parameters 
    * e.g. you have `fetchCount` and you add `fetchSpecificCount` that calls `fetchCount({ specific: true })` inside