FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
RUN npm install cordova
RUN npm install ionic
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .
EXPOSE 8100
CMD [ "npm", "start" ]