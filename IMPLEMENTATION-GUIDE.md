# Guia de Implementação GSAP - ApplyBrasil

## 📋 Overview

Este guia fornece instruções completas para implementar animações avançadas com GSAP no site ApplyBrasil, mantendo performance e acessibilidade.

## 🚀 Setup Rápido

### 1. Substituir main.ts
```bash
# Backup do arquivo atual
cp src/main.ts src/main.ts.backup

# Usar o novo arquivo
cp gsap-enhanced-main.ts src/main.ts
```

### 2. Adicionar arquivo de animações
```bash
# O arquivo gsap-animations.js já foi criado
# Certifique-se de que está na pasta raiz
```

### 3. Atualizar package.json (se necessário)
```json
{
  "dependencies": {
    "gsap": "^3.14.2"
  }
}
```

## 🎨 Tipos de Animação Disponíveis

### 1. **Hero Section - Animação de Entrada**
```html
<section id="hero" data-animate="hero-entrance">
  <!-- Elementos de fundo -->
  <div data-bg-element class="absolute inset-0">
    <div class="bg-primary/25 absolute -top-28 left-1/2 h-72 w-36"></div>
  </div>
  
  <!-- Conteúdo com stagger -->
  <div data-animate-group>
    <div data-animate-item>Badges</div>
    <h1 data-animate-item>Título principal</h1>
    <p data-animate-item>Descrição</p>
    <div data-animate-item>Botões</div>
    <div data-animate-item data-animate-counter>Estatísticas</div>
  </div>
</section>
```

### 2. **Cards 3D Interativos**
```html
<article data-animate-3d="card">
  <div class="card-body">
    <h3>Título do Card</h3>
    <p>Conteúdo do card</p>
  </div>
</article>
```

### 3. **Animações de Slide**
```html
<!-- Slide da esquerda -->
<div data-animate-slide="left" class="card">
  <!-- Conteúdo -->
</div>

<!-- Slide da direita -->
<div data-animate-slide="right" class="card">
  <!-- Conteúdo -->
</div>
```

### 4. **Elementos Flutuantes**
```html
<div data-animate-hover="float">
  <!-- Elemento que vai flutuar -->
</div>
```

### 5. **Parallax**
```html
<div data-parallax="0.5" class="background-element">
  <!-- 0.5 = velocidade do parallax -->
</div>
```

### 6. **Contadores Animados**
```html
<div data-animate-counter class="stats">
  <div class="stat">
    <div class="stat-value">70%</div>
    <div class="stat-desc">Descrição</div>
  </div>
  <div class="stat">
    <div class="stat-value">8x</div>
    <div class="stat-desc">ROI</div>
  </div>
</div>
```

### 7. **Revelação de Texto**
```html
<h2 data-animate-text>Título que aparece letra por letra</h2>
```

## 🔧 Implementação Passo a Passo

### Passo 1: Hero Section
Adicione ao hero section existente:

```html
<section id="hero" data-animate="hero-entrance" class="relative mx-auto w-full max-w-6xl overflow-hidden px-4 pt-12 sm:pt-16">
  <!-- Adicionar data-bg-element aos elementos de fundo -->
  <div aria-hidden="true" class="pointer-events-none absolute inset-0">
    <div data-bg-element class="bg-primary/25 absolute -top-28 left-1/2 h-72 w-36 -translate-x-1/2 rounded-full blur-3xl sm:h-96 sm:w-44"></div>
    <div data-bg-element class="bg-secondary/20 absolute top-32 -left-24 h-64 w-64 rounded-full blur-3xl sm:top-24 sm:h-80 sm:w-80"></div>
    <div data-bg-element class="bg-accent/15 absolute right-0 -bottom-28 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96"></div>
  </div>
  
  <!-- Manter o grid existente, adicionar data-animate-group e data-animate-item -->
  <div class="grid items-center gap-10 md:grid-cols-2">
    <div class="space-y-6" data-animate-group>
      <div class="flex flex-wrap items-center gap-2" data-animate-item>
        <!-- Badges existentes -->
      </div>
      
      <h1 class="text-4xl leading-tight font-bold tracking-tight sm:text-5xl" data-animate-item>
        <!-- Título existente -->
      </h1>
      
      <p class="text-base-content/80 w-2/3 sm:w-full sm:text-lg" data-animate-item>
        <!-- Texto existente -->
      </p>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center" data-animate-item>
        <!-- Botões existentes -->
      </div>
      
      <div class="stats stats-vertical lg:stats-horizontal border-base-300 bg-base-200/80 sm:bg-base-200/30 w-full border shadow" data-animate-item data-animate-counter>
        <!-- Stats existentes -->
      </div>
    </div>
  </div>
</section>
```

### Passo 2: Seção Serviços
Adicione efeitos 3D aos cards:

```html
<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-animate-group>
  <article data-animate-item data-animate-3d="card">
    <!-- Conteúdo do card de tráfego pago -->
  </article>
  
  <article data-animate-item data-animate-3d="card">
    <!-- Conteúdo do card de automação -->
  </article>
  
  <article data-animate-item data-animate-3d="card">
    <!-- Conteúdo do card de cibersegurança -->
  </article>
</div>
```

### Passo 3: Soluções IA
Adicione animações flutuantes:

```html
<div class="mt-8 grid gap-8 md:grid-cols-2">
  <div class="card border-base-200 bg-linear-to-br from-primary/5 to-base-100 border shadow-lg" 
       data-animate-item 
       data-animate-hover="float">
    <!-- Card Cognando -->
  </div>
  
  <div class="card border-base-200 bg-linear-to-br from-secondary/5 to-base-100 border shadow-lg" 
       data-animate-item 
       data-animate-hover="float">
    <!-- Card Chista -->
  </div>
</div>
```

### Passo 4: Depoimentos
Adicione slides direcionais:

```html
<div class="mt-8 grid gap-4 md:grid-cols-2">
  <div class="card border-base-200 bg-radial from-primary/5 from-40% to-base-100 border shadow shadow-primary/10" 
       data-animate-slide="left">
    <!-- Depoimento 1 -->
  </div>
  
  <div class="card border-base-200 bg-radial from-primary/5 from-40% to-base-100 border shadow shadow-primary/10" 
       data-animate-slide="right">
    <!-- Depoimento 2 -->
  </div>
</div>
```

### Passo 5: Seção Sobre
Adicione parallax à imagem:

```html
<section id="sobre" class="mx-auto w-full max-w-6xl px-4 pt-14 sm:pt-20">
  <div class="grid items-center gap-10 sm:grid-cols-3">
    <div class="space-y-4 sm:col-span-2" data-animate="fade-up">
      <!-- Conteúdo de texto -->
    </div>
    <div>
      <img data-parallax="0.3" 
           src="/sobre-nos-applybrasil.webp" 
           alt="Escritório da Apply Brasil" 
           class="rounded-xl w-full h-auto object-cover">
    </div>
  </div>
</section>
```

## ⚡ Performance Considerations

### 1. **Respeito a prefers-reduced-motion**
- Todas as animações são desativadas automaticamente
- Mantém funcionalidade sem animações

### 2. **Otimizações Implementadas**
- `requestAnimationFrame` para atualizações DOM
- Batch reads/writes para evitar layout thrashing
- ScrollTrigger otimizado
- Cleanup automático de event listeners

### 3. **Memory Management**
- Cleanup automático no page unload
- Observer para conteúdo dinâmico
- Kill de ScrollTriggers não utilizados

## 🎯 Melhores Práticas

### 1. **Timing**
- Hero: 1.2s para background, 0.8s para conteúdo
- Cards: 0.6s duração, stagger de 0.15s
- Contadores: 2s duração com snap

### 2. **Easing**
- `power3.out` para elementos de fundo
- `power2.out` para conteúdo
- `power1.inOut` para animações contínuas

### 3. **Stagger Values**
- Hero items: 0.15s
- Service cards: 0.1s
- Group animations: 0.06s

## 🔍 Debug e Troubleshooting

### 1. **Verificar se animações estão ativas**
```javascript
// No console
console.log(gsap.globalTimeline.timeScale());
```

### 2. **Verificar ScrollTriggers**
```javascript
// Listar todos os ScrollTriggers ativos
console.log(ScrollTrigger.getAll());
```

### 3. **Forçar re-inicialização**
```javascript
// No console
reinitAnimations();
```

## 📱 Responsividade

### Breakpoints Considerados
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Ajustes Automáticos
- 3D effects reduzidos em mobile
- Stagger values adaptativos
- Parallax desativado em dispositivos móveis

## 🚀 Deploy

### 1. **Build**
```bash
npm run build
```

### 2. **Preview**
```bash
npm run preview
```

### 3. **Verificar em Produção**
- Testar animações em diferentes dispositivos
- Verificar performance com Lighthouse
- Confirmar acessibilidade

## 📈 Métricas de Performance

### Objetivos
- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms

### GSAP Specific
- Tempo total de animação: < 3s
- Frames por segundo: 60fps
- Memory usage: < 50MB adicional

---

## 🎉 Resultado Esperado

Com esta implementação, o site ApplyBrasil terá:

1. **Entrada hero impactante** com animação coordenada
2. **Cards interativos 3D** que respondem ao mouse
3. **Contadores animados** que mostram crescimento
4. **Transições suaves** entre seções
5. **Performance otimizada** mantendo acessibilidade
6. **Experiência moderna** que impressiona visitantes

O resultado é uma apresentação profissional que comunica tecnologia e inovação, alinhada com o posicionamento da agência como especialista em marketing digital com IA.
