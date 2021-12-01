# Simultanous chess display
 (pl. System do symultanicznej gry szachowej)



## Getting started

###What is required:

- Node.js
- Docker
- grpc, grpc/proto-loader, grpc-web, google-protobuf(`npm i grpc @grpc/proto-load`, `npm i grpc-web google-protobuf`)

#### 1. Clone repository
#### 2. In project directory run `npm install package`
#### 3. Set up Envoy proxy using Docker
In project directory:
- `docker build -t grpc-app .`
- `docker run -d --name grpc-app -p 8080:8080 -p 9901:9901 grpc-app`

#### 4. Run server: `node ./server/server`
#### 5. In `src` directory run React App `npm start`
#### 6. Open http://localhost:3000 to view app in browser


