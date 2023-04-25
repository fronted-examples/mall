FROM node:12.22.7
WORKDIR /usr/local/docker-vue-ssr/vue-ssr
COPY . /usr/local/docker-vue-ssr
RUN cd /usr/local/docker-vue-ssr/vue-ssr
RUN npm install
EXPOSE 3000
CMD [ "node", "pro-server.js" ]
