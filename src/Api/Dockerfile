FROM node:latest
WORKDIR /Api
COPY package.json /Api
COPY tsconfig.json /Api
COPY . /Api
RUN npm install && npm run build
EXPOSE 80
CMD ["node", "."]