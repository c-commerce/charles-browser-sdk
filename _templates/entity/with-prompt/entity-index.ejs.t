---
to: "<%= 'src/entities/' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) + '/index.ts' %>"
---
<%
  pluralizedName = h.inflection.pluralize(h.inflection.humanize(name, true))
  singularizedName = h.inflection.singularize(h.inflection.humanize(name, true))
  capitalizedName = h.inflection.capitalize(singularizedName)
  capitalizedPluralName = h.inflection.capitalize(pluralizedName)
%>
import {
  <%= capitalizedName %>,
  <%= capitalizedPluralName %>,
  <%= capitalizedPluralName %>FetchRemoteError
} from '<%= './' + h.inflection.camelize(h.inflection.singularize(h.inflection.humanize(name, true)), true) %>'

export {
  <%= capitalizedName %>,
  <%= capitalizedPluralName %>,
  <%= capitalizedPluralName %>FetchRemoteError
}
