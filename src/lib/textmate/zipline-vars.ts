export const variablesTextmateGrammar = {
  displayName: 'Zipline Template',
  name: 'zipline',
  scopeName: 'source.zipline',
  fileTypes: [],
  foldingStartMarker: '\\{\\s*$',
  foldingStopMarker: '^\\s*}',
  patterns: [
    {
      include: '#template_expression',
    },
  ],
  repository: {
    template_expression: {
      begin: '\\{',
      beginCaptures: {
        '0': {
          name: 'punctuation.definition.template.begin.zipline',
        },
      },
      end: '\\}',
      endCaptures: {
        '0': {
          name: 'punctuation.definition.template.end.zipline',
        },
      },
      name: 'meta.template.block.zipline',
      patterns: [
        {
          include: '#root_variable',
        },
        {
          include: '#property',
        },
        {
          include: '#conditional_block',
        },
        {
          include: '#modifier',
        },
      ],
    },
    root_variable: {
      match: '\\b(var|user|file|url|link|metricsUser|metricsZipline|debug)\\b',
      name: 'support.variable.zipline',
    },
    property: {
      captures: {
        '1': {
          name: 'punctuation.separator.period.zipline',
        },
        '2': {
          name: 'variable.other.property.zipline',
        },
      },
      match: '(\\.)([a-zA-Z_$][\\w$]*)',
    },
    conditional_block: {
      begin: '(::)(istrue|exists|\\$|\\^|~|=|>=|>|<=|<)([^\\{\\[\\]]*)(\\[)',
      beginCaptures: {
        '1': {
          name: 'punctuation.separator.modifier.zipline',
        },
        '2': {
          name: 'keyword.operator.conditional.zipline',
        },
        '3': {
          name: 'constant.other.comparison.zipline',
        },
        '4': {
          name: 'punctuation.definition.array.begin.zipline',
        },
      },
      end: '\\]',
      endCaptures: {
        '0': {
          name: 'punctuation.definition.array.end.zipline',
        },
      },
      patterns: [
        {
          include: '#string_literal',
        },
        {
          match: '\\|\\|',
          name: 'keyword.operator.logical.or.zipline',
        },
      ],
    },
    modifier: {
      captures: {
        '1': {
          name: 'punctuation.separator.modifier.zipline',
        },
        '2': {
          name: 'entity.name.function.modifier.zipline',
        },
      },
      match: '(::)([^:\\}]+)',
    },
    string_literal: {
      begin: '"',
      beginCaptures: {
        '0': {
          name: 'punctuation.definition.string.begin.zipline',
        },
      },
      end: '"',
      endCaptures: {
        '0': {
          name: 'punctuation.definition.string.end.zipline',
        },
      },
      name: 'string.quoted.double.zipline',
      patterns: [
        {
          include: '#template_expression',
        },
      ],
    },
  },
};
