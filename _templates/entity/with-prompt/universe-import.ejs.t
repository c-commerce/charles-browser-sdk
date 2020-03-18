---
inject: true
to: src/universe/index.ts
before: hygen:import:injection
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(name)
%>
import * as <%= singularizedName %> from '../entities/<%= singularizedName %>/<%= singularizedName %>'
