# The first steps to make the project funcional are

npm install vue
npm install vue-router
npm install pinia
npm install vite
npm install vuetify

# S3 bucket

npm install aws-sdk

# To run the project use

npm run dev

# To use locally make sure fetch on store are aimed correctly

# To run dockerfile use the following command

docker build -t (user)/(nameimage):(tagname) .
docker run -d -p 8080:80 ggszgz/frontend:latest

# Change fetch urls on store before build in docker
# Local
https://localhost:(backendport/swaggerport)/example
# Docker
http://localhost:(8001:or backendport/swaggerport in docker)/example
