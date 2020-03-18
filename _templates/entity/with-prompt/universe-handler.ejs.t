---
inject: true
to: src/universe/index.ts
before: hygen:handler:injection
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(pluralizedName)
%>
  public async <%= pluralizedName %>(): Promise<<%= singularizedName %>.<%= capitalizedName %>[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${<%= name %>.<%= capitalizedPluralName %>.endpoint}`)
      const resources = res.data.data as <%= singularizedName %>.<%= capitalizedName %>RawPayload[]

      return resources.map((resource: <%= singularizedName %>.<%= capitalizedName %>RawPayload) => {
        return <%= singularizedName %>.<%= capitalizedName %>.create(resource, this, this.http)
      })
    } catch (err) {
      throw new <%= singularizedName %>.<%= capitalizedPluralName %>FetchRemoteError(undefined, { error: err })
    }
  }
