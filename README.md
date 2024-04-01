# Projeto Node.js

<strong>PRIMEIROS PASSOS</strong>

- `Clone o repositório`: git clone https://github.com/EricBernardi/search_country_back.git

- `Instale as dependências`: npm install

- `Crie a imagem do docker usando o seguinte comando`: *docker build -t search_country .* (Obs: O ponto final é essencial)

<strong>USO</strong>

- `Compile o código`: npx tsc

- `Inicie o servidor`: npm start

- `Para subir o container Docker (Caso seja de sua preferência) é necessário rodar`: docker compose up

<strong>EXEMPLO DE REQUISIÇÃO</strong>

- `curl -u -X POST` http://localhost:3000/brazil


# Tecnologias utilizadas

- `Node.js`