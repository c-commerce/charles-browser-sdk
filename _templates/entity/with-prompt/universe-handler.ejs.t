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
  public async <%= pluralizedName %>(): Promise<<%= name %>.<%= capitalizedName %>[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${<%= name %>.<%= capitalizedPluralName %>.endpoint}`)
      const resources = res.data.data as <%= name %>.<%= capitalizedName %>RawPayload[]

      return resources.map((resource: <%= name %>.<%= capitalizedName %>RawPayload) => {
        return <%= name %>.<%= capitalizedName %>.create(resource, this, this.http)
      })
    } catch (err) {
      throw new <%= name %>.<%= capitalizedPluralName %>FetchRemoteError(undefined, { error: err })
    }
  }
