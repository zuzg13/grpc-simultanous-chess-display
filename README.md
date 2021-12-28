# System do symultanicznej gry szachowej (eng. Simultanous chess display)

### (eng. version below)


## Konfiguracja krok po kroku

### Wymagania:

- Node.js
- Docker
- grpc, grpc/proto-loader, grpc-web, google-protobuf(`npm i grpc @grpc/proto-load`, `npm i grpc-web google-protobuf`)

#### 1. Sklonuj repozytorium
#### 2. W folderze projektu wykonaj komendę `npm install package`
#### 3. Skonfiguruj Envoy proxy z użyciem Dockera
W folderze projektu:
- `docker build -t grpc-app .`
- `docker run -d --name grpc-app -p 8080:8080 -p 9901:9901 grpc-app`

#### 4. Uruchom serwer gRPC : `node ./server/server`
#### 5. W folderze `src` zbuduj React App komendą `npm build`
#### 6. W folderze projektu uruchom statyczny serwer `serve -s build`
#### 7. Otwórz http://localhost:3000 by zobaczyć aplikację w przeglądarce.

## Getting started

### What is required:

- Node.js
- Docker
- grpc, grpc/proto-loader, grpc-web, google-protobuf(`npm i grpc @grpc/proto-load`, `npm i grpc-web google-protobuf`)

#### 1. Clone repository
#### 2. In project directory run `npm install package`
#### 3. Set up Envoy proxy using Docker
In project directory:
- `docker build -t grpc-app .`
- `docker run -d --name grpc-app -p 8080:8080 -p 9901:9901 grpc-app`

#### 4. Run gRPC server: `node ./server/server`
#### 5. In `src` directory build React App with `npm build`
#### 6. Run static server `serve -s build`
#### 7. Open http://localhost:3000 to view app in browser


