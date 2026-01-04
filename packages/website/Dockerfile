FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM scratch
COPY --from=build /usr/src/app/build /build
ENTRYPOINT ["/"]

# use it via `docker build --output=. . ` to produce build files