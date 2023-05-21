FROM node:12.22.7
WORKDIR /usr/local/docker/docker-mall/mall
COPY . /usr/local/docker/docker-mall
RUN cd /usr/local/docker/docker-mall/mall
RUN npm install
EXPOSE 3000
CMD [ "node", "pro-server.js" ]
