---
to: "<%= 'src/entities/' + h.inflection.dasherize(h.inflection.singularize(name), true) + '/index.ts' %>"
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
import {
  <%= className %>,
  <%= classListName %>,
  <%= classListName %>FetchRemoteError
} from '<%= './' + h.inflection.dasherize(singularizedName, true) %>'

export {
  <%= className %>,
  <%= classListName %>,
  <%= classListName %>FetchRemoteError
}
