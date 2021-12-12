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
  public <%= camelizedName %>List (): <%= camelizedSingularName %>.<%= classListName %> {
    return new <%= camelizedSingularName %>.<%= classListName %>({ universe: this, http: this.http })
  }
