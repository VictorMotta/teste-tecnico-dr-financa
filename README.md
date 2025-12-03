# Teste técnico - Engenheiro de Software NodeJS

<img src="./assets/logo-Dr.-Financas-scaled.jpg"/>

<hr/>
<details><summary><h1>Documentação da API</h1></summary>

### [Documentação em swagger 🔗](./docs/invoice.swagger.yml)

#### **Link local rodando no docker:** http://localhost/

#### **Link local rodando com nodemon:** http://localhost:4000/


<details>
  <summary><h3>Rotas de Invoice</h3></summary>

### Criar uma solicitação de Nota Fiscal:

```
Caminho: /invoice
Método: POST
Rota: Autenticada
```

#### Autenticação:

```
{
  "headers":{
    "Authorization":"teste-api" //Chave colocada no .env
  },
}
```

#### Body:

```
{
    "name":"Yasmin",
    "email": "yasmin@gmail.com",
    "password": "123456",
    "role": "teacher"
}
```

#### Resposta:

```
{
  "status":201,
  "body":{
      "id": 1,
      "cnpjCustomer": "12345678000199",
      "municipality": "São Paulo",
      "state": "SP",
      "serviceValue": 1500.75,
      "desiredIssueDate": "2025-01-15T00:00:00.000Z",
      "description": "Serviço de consultoria técnica especializada",
      "status": "PENDENTE_EMISSAO",
      "numberNF": null,
      "emissionDate": null,
      "createdAt": "2025-12-03T05:59:03.062Z",
      "updatedAt": "2025-12-03T05:59:03.062Z"
  }
}
```

#### Erros possíveis:

- ##### Status: 401
    ```
      "error": "UnauthorizedError",
      "message": "Invalid token or missing authorization header"
    ```
- ##### Status: 400
    ```
      "error": "BadRequestError",
      "message": "cnpjCustomer is required; municipality is not allowed to be empty" // Sempre vai vir o nome do campo e se está vazio ou não foi enviado
    ```

- ##### Status: 500
    ```
      "error": "InternalServerError",
      "message": "Unexpected internal server error"
    ```


### Listar todas as solicitações de Notas Fiscais Criada:

```
Caminho: /invoice
Método: GET
Rota: Autenticada
```

#### Autenticação:

```
{
  "headers":{
    "Authorization":"teste-api" //Chave colocada no .env
  },
}
```

#### Resposta:

```
{
  "status":200,
  "body":[
    {
      "id": 2,
      "cnpjCustomer": "12345678000199",
      "municipality": "São Paulo",
      "serviceValue": 1500.75,
      "desiredIssueDate": "2025-01-15T00:00:00.000Z",
      "status": "PENDENTE_EMISSAO",
      "numberNF": null,
      "createdAt": "2025-12-03T07:05:20.915Z"
    },
    {
      "id": 1,
      "cnpjCustomer": "12345678000199",
      "municipality": "São Paulo",
      "serviceValue": 1500.75,
      "desiredIssueDate": "2025-01-15T00:00:00.000Z",
      "status": "EMITIDA",
      "numberNF": "71443",
      "createdAt": "2025-12-03T05:59:03.062Z"
    }
  ]
}
```

#### Erros possíveis:

- ##### Status: 401
    ```
      "error": "UnauthorizedError",
      "message": "Invalid token or missing authorization header"
    ```

- ##### Status: 500
    ```
      "error": "InternalServerError",
      "message": "Unexpected internal server error"
    ```

### Listar uma solicitação de Nota Fiscal Específica:

```
Caminho: /invoice/:invoice_id
Método: GET
Rota: Autenticada
```

#### Resposta:

```
{
  "status":200,
  "body":{
      "id": 1,
      "cnpjCustomer": "12345678000199",
      "municipality": "São Paulo",
      "state": "SP",
      "serviceValue": 1500.75,
      "desiredIssueDate": "2025-01-15T00:00:00.000Z",
      "description": "Serviço de consultoria técnica especializada",
      "status": "PENDENTE_EMISSAO",
      "numberNF": null,
      "emissionDate": null,
      "createdAt": "2025-12-03T05:59:03.062Z",
      "updatedAt": "2025-12-03T05:59:03.062Z"
  }
}
```

#### Erros possíveis:

- ##### Status: 401
    ```
      "error": "UnauthorizedError",
      "message": "Invalid token or missing authorization header"
    ```
- ##### Status: 400
    ```
      "error": "BadRequestError",
      "message": "id must be a number; // Sempre vai vir o nome do campo e se está vazio ou não foi enviado ou o tipo errado
    ```

- ##### Status: 500
    ```
      "error": "InternalServerError",
      "message": "Unexpected internal server error"
    ```

### Emitir uma Nota Fiscal a partir de uma solicitação:

```
Caminho: /invoice/:invoice_id/emit
Método: POST
Rota: Autenticada
```

#### Resposta:

```
{
  "status":200,
  "body":{
      "id": 1,
      "cnpjCustomer": "12345678000199",
      "municipality": "São Paulo",
      "state": "SP",
      "serviceValue": 1500.75,
      "desiredIssueDate": "2025-01-15T00:00:00.000Z",
      "description": "Serviço de consultoria técnica especializada",
      "status": "EMITIDA",
      "numberNF": "71443",
      "emissionDate": "2025-12-03T05:59:31.000Z",
      "createdAt": "2025-12-03T05:59:03.062Z",
      "updatedAt": "2025-12-03T05:59:31.167Z"
  }
}
```
#### Erros possíveis:

- ##### Status: 401
    ```
      "error": "UnauthorizedError",
      "message": "Invalid token or missing authorization header"
    ```
- ##### Status: 400
    ```
      "error": "BadRequestError",
      "message": "cnpjCustomer is required; municipality is not allowed to be empty" // Sempre vai vir o nome do campo e se está vazio ou não foi enviado
    ```

- ##### Status: 409
    ```
      "error": "ConflictError",
      "message": "Invoice cannot be emitted in its current status."
    ```

- ##### Status: 500
    ```
      "error": "InternalServerError",
      "message": "Unexpected internal server error"
    ```

- ##### Status: 503
    ```
      "error": "ExternalServiceError",
      "message": "Internal data error when formatting the Invoice for emission."
    ```

- ##### Status: 503
    ```
      "error": "ExternalServiceError",
      "message": "Service key authentication failed."
    ```

- ##### Status: 503
    ```
      "error": "ExternalServiceError",
      "message": "The Invoice emission service is unavailable. Please try again later."
    ```
- ##### Status: 503
    ```
      "error": "ExternalServiceError",
      "message": "The external API returned an unexpected error: 418."// Caso a API externa devolver um status diferente do esperado
    ```
- ##### Status: 503
    ```
      "error": "ExternalServiceError",
      "message": "Network failure or timeout when connecting to the external API." // Caso der qualquer outro erro nessa API ou função
    ```

</details>
</details>

<details><summary><h1>Como Rodar a API Localmente</h1></summary>


## **Instalação do Docker** (caso não esteja instalado)

<details>
  <summary>Clique aqui para ver como instalar o Docker</summary>

### **Linux**

#### **1. Configurar o repositório do Docker**

Execute os seguintes comandos no terminal:

```sh
# Atualizar pacotes e instalar dependências necessárias
sudo apt-get update
sudo apt-get install ca-certificates curl

# Criar diretório para armazenar a chave do repositório
sudo install -m 0755 -d /etc/apt/keyrings

# Adicionar a chave GPG oficial do Docker
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adicionar o repositório do Docker à lista de fontes do Apt
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar pacotes novamente
sudo apt-get update
```

#### **2. Instalar o Docker**
Para instalar a versão mais recente do Docker, execute:

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verifique se a instalação foi bem-sucedida:
```sh
sudo docker run hello-world
```

#### **3. Executar Docker sem sudo**

Para permitir o uso do Docker sem precisar de `sudo`, siga os passos abaixo:

```sh
# Criar o grupo docker
sudo groupadd docker

# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER
```

Agora, saia da sessão e faça login novamente para aplicar as mudanças.

Se estiver rodando o Linux em uma máquina virtual, pode ser necessário reiniciar a VM.

Caso queira aplicar as mudanças imediatamente sem reiniciar, execute:

```sh
newgrp docker
```

Para testar se o Docker pode ser executado sem `sudo`:

```sh
docker run hello-world
```

### **Windows**

Baixe e instale o **Docker Desktop**:
[Download Docker para Windows](https://www.docker.com/products/docker-desktop/)

Após a instalação, reinicie o computador e verifique a versão:
```sh
docker --version
```

### **MacOS**

Baixe e instale o **Docker Desktop**:
[Download Docker para Mac](https://www.docker.com/products/docker-desktop/)

Após a instalação, verifique a versão:
```sh
docker --version
```
</details>

---

## **Rodando a API**

### **1. Configurar variáveis de ambiente**
Copie o arquivo `.env.example` para `.env`:
```sh
cp .env.example .env
```
Edite o arquivo `.env` e configure os valores necessários, como a conexão com o banco de dados.

---

### **2. Subir os contêineres da aplicação**
Para iniciar a API com **Docker Compose**, execute o seguinte comando:
```sh
docker compose up --build -d
```
- O `--build` garante que a aplicação seja reconstruída com base nas alterações mais recentes.
- O `-d` executa os contêineres em segundo plano (modo "detached").

---

### **3. Parar a aplicação**
Para parar e remover os contêineres e volumes criados:
```sh
docker compose down -v
```
- O `-v` remove os volumes associados aos contêineres para evitar dados residuais.

---

Agora sua API está pronta para ser usada! 🚀

</details>

<details><summary><h1>Tarefa 3 - Diagrama de arquitetura para um processamento assíncrono</h1></summary>

### Contexto:

```
Você tem uma aplicação frontend para seus clientes.
Nesta aplicação, você precisa implementar uma funcionalidade em que o usuário
realizará alguma ação que levará tempo para ser concluída. A aplicação deve sempre
mostrar o último status do processamento.
No backend, essa ação do usuário irá disparar uma sequência de ações assíncronas
independentes entre si com tempos de conclusão diferentes.
Desenhe um diagrama de arquitetura para essa solução. Não é necessário codificar
nenhum dos componentes.
```
##### [Baixar arquivo de solicitação 🔗](./assets/Teste%20técnico%20-%20Engenheiro%20de%20Software%20NodeJS.pdf)



### Resolução:
<img src="./assets/diagrama-de-arquitetura-fluxo-assincrono -teste-tecnico.jpg"/>

#### [Se quiser baixar procure aqui a imagem 🔗](./assets/diagrama-de-arquitetura-fluxo-assincrono%20-teste-tecnico.jpg)

<details><summary><h5>EXTRA:</h5></summary>

#### Fluxograma técnico simples:
<img src="./assets/fluxo-eventos-arquitetura-assincrona.jpg"/>

#### Fluxograma técnico com retry:
<img src="./assets/fluxo-eventos-arquitetura-assincrona-com-retry.jpg"/>


</details>

</details>