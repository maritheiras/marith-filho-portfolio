# Design System - Portfolio Márith Filho

Referência visual: Resend.  
Direção: inspiração estética, sem copiar marca, textos, logo, imagens ou composição proprietária.

## 1. Direção Visual

Estilo: developer premium, minimalista, escuro e editorial.

Sensação desejada:
- técnico
- limpo
- sofisticado
- silencioso
- voltado a produto e engenharia

O portfólio deve parecer mais próximo de uma ferramenta moderna para desenvolvedores do que de um currículo visual tradicional.

## 2. Paleta

### Fundos

```css
--background: #000000;
--background-soft: #050505;
--surface: #0a0a0a;
--surface-elevated: #111111;
--surface-muted: #161616;
```

### Bordas

```css
--border-subtle: rgba(255, 255, 255, 0.08);
--border-default: rgba(255, 255, 255, 0.12);
--border-strong: rgba(255, 255, 255, 0.18);
```

### Texto

```css
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--text-muted: #71717a;
--text-faint: #3f3f46;
```

### Acentos

Usar acentos com muita moderação.

```css
--accent-white: #ffffff;
--accent-blue: #60a5fa;
--accent-purple: #a78bfa;
--accent-cyan: #22d3ee;
--accent-green: #34d399;
```

### Gradientes

```css
--gradient-ring: linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #facc15);
--gradient-text: linear-gradient(90deg, #ffffff, #a1a1aa);
--gradient-purple: linear-gradient(90deg, #ffffff, #a78bfa);
--gradient-surface: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
```

## 3. Tipografia

### Display

Usar uma serifada elegante no hero e em grandes chamadas.

Opções:
- Instrument Serif
- Newsreader
- Georgia como fallback

Uso:
- H1
- frases curtas de impacto
- destaques editoriais

### Interface

Usar uma sans limpa para navegação, cards, botões e textos.

Opções:
- Inter
- Geist
- system-ui

### Código

```css
--font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

## 4. Hierarquia Tipográfica

```css
Hero H1 desktop: 88px a 112px
Hero H1 mobile: 52px a 64px
Section H2: 48px a 64px
Card title: 18px a 22px
Body: 16px a 18px
Small: 13px a 14px
Mono/code: 13px
```

Regras:
- títulos curtos
- subtítulos com no máximo 2 linhas
- evitar blocos longos no hero
- textos de card com 1 ou 2 frases

## 5. Layout

### Container

```css
--container: 1200px;
--section-gap: 120px;
--content-gap: 32px;
```

### Hero

Desktop:
- duas colunas
- texto à esquerda
- visual técnico à direita
- muito espaço negativo

Mobile:
- logo no topo
- visual pode aparecer abaixo dos cards ou logo após CTA
- texto centralizado ou alinhado à esquerda, mas sempre curto

## 6. Componentes

### Header

Visual:
- transparente ou preto translúcido
- sem bordas fortes
- navegação pequena
- botão principal em cinza escuro

```css
background: rgba(0, 0, 0, 0.72);
border-bottom: 1px solid rgba(255,255,255,0.06);
backdrop-filter: blur(16px);
```

### Announcement Pill

Usar como badge de posicionamento.

Exemplo para o portfólio:
- "Disponível para oportunidades Jr."
- "Software Engineering Portfolio"
- "TypeScript, React e Node.js"

Visual:
- pill escura
- borda em gradiente sutil
- texto pequeno

### Botões

Primário:

```css
background: #ffffff;
color: #000000;
border: 1px solid #ffffff;
```

Secundário:

```css
background: transparent;
color: #a1a1aa;
border: 1px solid rgba(255,255,255,0.12);
```

Hover:
- elevar 1px
- clarear borda
- brilho sutil

### Cards

Cards devem quase desaparecer no fundo.

```css
background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
```

Uso:
- projetos
- stack
- experiência
- formação

### Code Panel

Essencial para dar identidade de desenvolvimento.

Visual:
- fundo preto
- borda fina
- tabs pequenas
- linhas de código em baixa opacidade
- highlights em roxo, azul e verde

## 7. Imagens e Elementos Visuais

Evitar:
- fotos stock
- gradientes coloridos grandes
- ilustrações óbvias
- excesso de cards

Usar:
- bloco de código
- mockup escuro
- textura sutil
- grid quase invisível
- brilho radial discreto
- símbolos técnicos abstratos

## 8. Conteúdo Para o Portfólio

Tom:
- curto
- técnico
- sem exagero
- confiante

Hero sugerido:

```txt
Software para produtos reais.
TypeScript, React, Next.js e Node.js.
```

Alternativas:

```txt
Código limpo para produtos digitais.
Desenvolvedor de Software Jr. focado em web, APIs e dados.
```

```txt
Construindo software com clareza.
TypeScript, React, Node.js e engenharia aplicada.
```

Seções:
- Projetos
- Stack
- Experiência
- Formação
- Contato

## 9. Ajustes Para o Perfil Márith

O visual deve aproximar o perfil de:
- software engineer
- produto web
- desenvolvimento moderno
- projetos reais
- domínio crescente em TypeScript

O projeto principal deve ser o Meu Trocado.

Ordem recomendada:
1. Hero curto
2. Projetos
3. Stack
4. Experiência
5. Formação
6. Contato

## 10. O Que Mudar No Site Atual

Trocar:
- ouro premium por preto/branco/cinza
- Outfit por combinação Serif Display + Inter
- cards dourados por cards monocromáticos
- hero "Código útil" por frase mais editorial
- imagem de capa como visual secundário ou substituir por code panel

Manter:
- estrutura geral
- currículo em PDF
- links de projetos
- foco em TypeScript, React, Next.js e Node.js

