requirement : 
- node 18x and up
- redis (can use with cloud)
- database not inclued 
- 
https://www.sitepoint.com/using-redis-node-js/
step by step :
setup : create env file and copy key from env example , then create your own data
run npm install for both service and api gate way
every api need to go throuh api gate way
run docker : docker-compose -f docker-compose.yaml up 