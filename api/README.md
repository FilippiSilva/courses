# Course API

## Setup

Verifique se tem você tem framework AdonisJs instalado em sua máquina. Case não, segue o comando de instalação

```bash
npm i -g @adonisjs/cli
```

Instale as dependências

```bash
npm install
```

Faça uma cópia do arquivo .env.example com o nome de .env

```bash
cp .env.example .env
```

Agora utilize o AdonisJs para criar e estruturar o banco de dados

```bash
adonis migration:run
```

Utilize o comando abaixo para popular o banco de dados com dados genéricos.

```bash
adonis seed
```

Pronto! Agora utiliza o comando a abaixo para iniciar o servidor

```bash
adonis serve
```
