
# Task Manager App

![React Native](https://img.shields.io/badge/React%20Native-blue)
![Expo](https://img.shields.io/badge/Expo-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Este é um aplicativo de gerenciamento de tarefas que desenvolvi com **React Native** (usando **Expo**) para **praticar conceitos importantes** como CRUD completo, animações no React Native e boas práticas de organização de código.

A ideia foi criar algo **simples e funcional**, mas que também tivesse **uma experiência de uso agradável** e uma base de código **fácil de manter e evoluir** — como se fosse um app real de lista de tarefas.

## Funcionalidades
- Adicionar novas tarefas
- Marcar tarefas como **concluídas** ou **pendentes**
- **Editar** o título de uma tarefa
- **Excluir** tarefas com confirmação
- **Filtros**: Todas, Pendentes e Concluídas
- **Busca por título** para localizar tarefas rapidamente
- **Animação de pulo** quando uma tarefa é marcada como concluída
- Interface simples, fluida e responsiva

## Tecnologias utilizadas
- [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) para comunicação com a API
- [React Native Animated](https://reactnative.dev/docs/animated) para animações
- [JSON Server](https://github.com/typicode/json-server) para simular a API

## Por que desenvolvi este projeto?
Este projeto nasceu como um **exercício de aprendizado**, para aplicar:
- Uso de **hooks personalizados** (`useTasks`) para gerenciar estado.
- **Refatoração** de código para seguir boas práticas (separação de responsabilidades entre Service, Hook e Componente).
- **UI/UX mais refinada**, com pequenas animações e confirmação de ações importantes.

Além de ser um ótimo **projeto para portfólio**, ele me ajudou a melhorar a **organização de código em projetos React Native** e pensar em **arquiteturas que facilitam futuras implementações**.

## Como rodar o projeto

1. **Clone o repositório**
```bash
git clone https://github.com/Wesleyweb30/my-task-app
cd my-task-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor JSON (API fake)**
Crie um arquivo `db.json` na raiz do projeto com o conteúdo inicial:
```json
{
  "tasks": []
}
```
E rode:
```bash
npx json-server --watch db.json --port 3001
```

4. **Configure a URL da API**
No arquivo `src/services/api.ts` aponte para a URL do JSON Server:
```ts
import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000"
});
```

5. **Inicie o app**
```bash
npx expo start
```

6. **Abra no emulador ou no celular** usando o aplicativo Expo Go.

## Estrutura do projeto
```
src/
 ├─ components/   # Componentes reutilizáveis (Formulário, Lista, etc)
 ├─ hooks/        # Lógica de estado (useTasks)
 ├─ services/     # Comunicação com a API
 ├─ screens/      # Telas do aplicativo
 └─ interface/    # Tipagens (TypeScript)
```

## Próximos passos
- Implementar **swipe** (arrastar para editar ou excluir, estilo WhatsApp).
- Criar **animações mais avançadas** para transições.
- Adicionar **testes automatizados** para garantir a estabilidade.
