# Projeto: Markdown to HTML Converter Web App

## 1. Visão Geral do Projeto

Desenvolvimento de uma aplicação web frontend para conversão em tempo real de código Markdown para HTML. A ferramenta deve suportar as sintaxes padrão do Markdown, sintaxes estendidas de ferramentas como Notion e Obsidian, e permitir a injeção segura de HTML nativo.
Objetivos Principais:

- Renderização em tempo real (Split-screen).
- Suporte a Drag & Drop de arquivos `.md` e `.txt`.
- Visualização dupla de saída (HTML Renderizado vs. Código Fonte HTML).
- Exportação do resultado como arquivo `index.html`.

## 2. Tech Stack

- Framework: Next.js (App Router) com React.
- Estilização: Tailwind CSS.
- Biblioteca de UI: `shadcn/ui` (Baseado em Radix UI e Tailwind).
- Motor de Conversão: `markdown-it`.
- Plugins do Markdown-it:
  - `markdown-it-task-lists` (Checkboxes)
  - `markdown-it-multimd-table` (Tabelas avançadas)
  - `markdown-it-wikilinks` (Links do Obsidian `[[]]`)
  - `markdown-it-container` (Para recriar os collapsibles/toggles do Notion)
- Utilitários de Front-end:
  - `react-dropzone` (Para área de arrastar e soltar)
  - `lucide-react` (Ícones).

## 3. Padrão de Arquitetura e Desenvolvimento

O desenvolvimento deve seguir o princípio de Separation of Concerns (SoC). A lógica de negócio (parser de Markdown) deve ser completamente agnóstica em relação à interface (React).
Estrutura de Diretórios Recomendada

```text
/src
  /app # Rotas do Next.js (App Router)
    page.tsx # Ponto de entrada da UI
    layout.tsx # Layout base
  /components
    /ui # Componentes gerados pelo shadcn/ui
    /editor # Componentes específicos do projeto
      SplitScreen.tsx # Layout principal
      MarkdownInput.tsx # Área de texto esquerda e Drag/Drop
      HtmlPreview.tsx # Área de visualização direita (Tabs)
  /lib
    parser.ts # Motor de conversão do markdown-it e plugins
    utils.ts # Funções auxiliares (download de arquivo, classes do shadcn)
```

## 4. Elementos de UI (`shadcn/ui`)

O agente de IA deve inicializar o projeto shadcn e instalar os seguintes componentes primários:

- `Tabs`: Para alternar a visualização da tela direita entre "Preview (Renderizado)" e "Code (HTML puro)".
- `Textarea`: Para a área de digitação de código na esquerda e exibição do código HTML na direita.
- `Button`: Para as ações de "Baixar HTML" e "Copiar Código".
- `ScrollArea`: Para garantir uma rolagem suave e customizada nas duas metades da tela.
- `Toast` (ou `Sonner`): Para feedback visual ao usuário (ex: "Arquivo carregado com sucesso", "Código copiado", "Erro ao ler arquivo").
- `Card`: Para envolver e estilizar os painéis do editor.

## 5. Requisitos Funcionais e Lógicos

### 5.1. O Motor de Conversão (`/lib/parser.ts`)

- Deve instanciar o `markdown-it` com a opção `html: true` habilitada.
- Deve registrar os plugins de tarefas, tabelas e wikilinks.
- Implementação do Toggle (Notion-like): O agente deve configurar o `markdown-it-container` para reconhecer a sintaxe `::: toggle Título do Collapsible` e convertê-la estruturalmente para:

```html
<details>
  <summary>Título do Collapsible</summary>
  Conteúdo interno convertido...
</details>
```

### 5.2. Drag and Drop (`react-dropzone`)

- O componente principal de input deve ser encapsulado pela lógica do Dropzone.
- Restrição: Aceitar apenas arquivos MIME type text/markdown ou text/plain.
- Ao dropar o arquivo, usar a API FileReader nativa, ler o texto e atualizar o estado global ou local que alimenta o Textarea.

### 5.3. Funcionalidade de Download

Criar uma função que recebe a string de saída (HTML gerado).
Envolver a string em uma estrutura HTML básica (adicionar `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
Gerar um `Blob` com o tipo `text/html`.
Criar um elemento `<a>` dinâmico, setar o `href` com `URL.createObjectURL(blob)`, disparar o `.click()` programaticamente e limpar a URL da memória.

## 6. Instruções Específicas para o Agente de IA

1. Fase de Setup: Comece criando o projeto Next.js, configurando o Tailwind e instalando o `shadcn/ui`.
2. Fase do Core: Crie o arquivo `/lib/parser.ts`. Implemente toda a lógica do `markdown-it` e seus plugins. Teste a função de parser com strings mockadas antes de tocar no React.
3. Fase de UI: Construa os componentes de interface usando os elementos do `shadcn`. Garanta que o layout ocupe 100vh e não quebre em telas menores (adote um layout em coluna no mobile e lado a lado no desktop).
4. Integração: Conecte o estado do React ao parser.ts usando debounce no onChange do textarea para otimizar a performance da renderização se o texto for muito longo. Adicione o `react-dropzone`.
