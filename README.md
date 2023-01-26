# gitVuewer - navegador de repositórios do Github

O gitVuewer é um navegador do Github. Ele permite buscar por um perfil, selecionar um dos repositórios desse perfil e navegar e visualizar os arquivos contidos nele (quando o arquivo está em um formato de texto compatível).

Para acessar o app, visite https://mhenrique94.github.io/gitvuewer/.

Para rodar o projeto localmente (use um terminal e git clone <este_repositorio>):

Use os seguintes comandos:

```
cd gitvuewer
npm install
npm run serve
```

### Tecnologias e ferramentas utilizadas:

- Github API
- Vue
- Vuetify
- Material Design Icons
- MomentJs

### Mais detalhes:

1. Busca por perfis entrando com o nome do usuário;
2. Detalhes de perfil como seguidores, seguindo, bio, local, número de repositórios e foto de usuário;
3. Listagem de todos os repositórios públicos do perfil selecionado
4. Permite escolher navegação em modo lista ou árvore de arquivos;
5. [Modo lista] Navegação entre os arquivos do repositório selecionado com a possibilidade de voltar e especificação do caminho realizado;
6. Visualização do conteúdo de arquivos de texto mais conhecidos (.html, .css, .js, .py, .yaml, .txt, etc)
7. Visualização das issues abertas no repositório com link para visualização na plataforma Github

### Captura de tela:

![Captura de Tela do aplicativo em funcioanamento](https://github.com/mhenrique94/gitvuewer/blob/main/src/assets/pv_gitvuewer.jpg "Captura de Tela do aplicativo em funcioanamento").
