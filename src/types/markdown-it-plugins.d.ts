declare module 'markdown-it-task-lists' {
  import type MarkdownIt from 'markdown-it'
  interface TaskListsOptions {
    enabled?: boolean
    label?: boolean
    labelAfter?: boolean
  }
  const taskLists: MarkdownIt.PluginWithOptions<TaskListsOptions>
  export default taskLists
}

declare module 'markdown-it-multimd-table' {
  import type MarkdownIt from 'markdown-it'
  interface MultiMdTableOptions {
    multiline?: boolean
    rowspan?: boolean
    headerless?: boolean
    multibody?: boolean
    autolabel?: boolean
  }
  const multimdTable: MarkdownIt.PluginWithOptions<MultiMdTableOptions>
  export default multimdTable
}
