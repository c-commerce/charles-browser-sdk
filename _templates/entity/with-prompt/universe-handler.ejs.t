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
    return await this.makeBaseResourceListRequest<<%= camelizedSingularName %>.<%= className %>, <%= camelizedSingularName %>.<%= classListName %>, <%= camelizedSingularName %>.<%= className %>RawPayload, EntityFetchOptions, <%= camelizedSingularName %>.<%= classListName %>FetchRemoteError>(<%= camelizedSingularName %>.<%= className %>, <%= camelizedSingularName %>.<%= classListName %>, <%= camelizedSingularName %>.<%= classListName %>FetchRemoteError, options)
  }
