FROM node:20-alpine

ARG NPM_TOKEN

ARG GITHUB_NPM_TOKEN

ARG APP_NAME

ARG ENVIRONMENT

RUN apt update && apt install libpng-dev python3 make g++ -y

ADD . /${APP_NAME}

RUN echo ${NPM_TOKEN} > /root/.npmrc
RUN echo ${GITHUB_NPM_TOKEN} >> /root/.npmrc
RUN echo '@curefit:registry=https://npm.pkg.github.com/' >> /root/.npmrc
RUN echo 'registry=https://registry.npmjs.org/' >> /root/.npmrc
RUN echo 'unsafe-perm=true' >> /root/.npmrc

RUN mkdir -p /${APP_NAME}-deploy/

WORKDIR /${APP_NAME}

RUN deploy/build_k8s.sh /${APP_NAME}-deploy ${ENVIRONMENT}

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev