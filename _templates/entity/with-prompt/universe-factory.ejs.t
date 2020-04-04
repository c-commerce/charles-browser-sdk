---
inject: true
to: src/universe/index.ts
before: hygen:factory:injection
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(pluralizedName)
%>
  public <%= singularizedName %>(payload: <%= singularizedName %>.<%= capitalizedName %>RawPayload): <%= singularizedName %>.<%= capitalizedName %> {
    return <%= singularizedName %>.<%= capitalizedName %>.create(payload, this, this.http)
  }
