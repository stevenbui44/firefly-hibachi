FROM node:lts
# Set working directory
WORKDIR /app

# install node modules
COPY ./package*.json .
RUN npm install

# RUN npm install -g nodemon

# Copy all files from current directory to working dir in image
COPY . .

ENV PORT 3000

ENTRYPOINT [ "npm", "start"]