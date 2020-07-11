---
inject: true
to: src/universe/index.ts
before: hygen:handler:injection
---
<%
  pluralizedName = h.inflection.pluralize(name)
  singularizedName = h.inflection.singularize(name)
  singularizedHumanName = h.inflection.humanize(singularizedName, true)
  humanPlural = h.inflection.humanize(pluralizedName)
  titleHumanPlural = h.changeCase.title(humanPlural, true)
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(name)
  camelizedName = h.inflection.camelize(name, true)
  camelizedSingularName = h.inflection.camelize(singularizedName, true)
  className  = h.changeCase.pascal(singularizedName, true)
  classListName  = h.changeCase.pascal(pluralizedName, true)
  title  = h.changeCase.title(singularizedName, true)
%>
  public async <%= camelizedName %>(options?: EntityFetchOptions): Promise<<%= camelizedSingularName %>.<%= className %>[] | <%= camelizedSingularName %>.<%= className %>RawPayload[] | undefined> {
    try {
      const res = await this.http.getClient().get(`${this.universeBase}/${<%= camelizedSingularName %>.<%= classListName %>.endpoint}`, {
        params: {
          ...(options?.query ?? {})
        }
      })

      const resources = res.data.data as <%= camelizedSingularName %>.<%= className %>RawPayload[]

      if (options && options.raw === true) {
        return resources
      }

      return resources.map((resource: <%= camelizedSingularName %>.<%= className %>RawPayload) => {
        return <%= camelizedSingularName %>.<%= className %>.create(resource, this, this.http)
      })
    } catch (err) {
      throw new <%= camelizedSingularName %>.<%= classListName %>FetchRemoteError(undefined, { error: err })
    }
  }
