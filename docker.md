# 도커를 알아보자
## 개념
- image(base image - 업체 배포) [docker hub](http://hub.docker.com)

### docker pull
- 실습
```bash
docker pull ubuntu:latest
```

### docker run
- 이미지를 pull하지 않아도 run 실행시 나의 저장소에 없으면 자동으로 다운로드한다.
- container image를 실행한 공간 - run(최초 container를 만들고) -> start, stop, restart
```bash
# container 다운로드 및 생성
docker run ubuntu 
docker run -it ubuntu:latest 
docker run -it --name my-ubuntu ubuntu:latest 
docker run -it -d --name my-ubuntu ubuntu:latest 
docker run -it -d -p 22:22 --name my-ubuntu ubuntu:latest 
docker run -it -d -p 22:22 --network my-network --name my-ubuntu ubuntu:latest 
docker run -it -d --rm -p 22:22 --network my-network --name my-ubuntu ubuntu:latest 

# container 멈추기
docker stop my-ubuntu
# container 지우기
docker rm my-ubuntu
# container 실행
docker run -d -p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=000000 \
-v ~/Works/mysql-db-5.7:/var/lib/mysql \
--name mysql-5.7 \
mysql:5.7
```
docker run [OPTIONS...] [IMAGE[:TAG]] [COMMAND] [ARG...]

### docker exec
- detach mode로 실행중인 docker container에 접속해서 명령을 수행
```bash
# mysql-5.7 container 가 detach로 실행되고 있으면
docker exec -it mysql-5.7 bash #1
~ mysql -uroot -p
docker exec -it mysql-5.7 mysql -uroot -p #2
```

## docker build - dockerfile/.dockerignore 
- 우리의 설정 + base image = 우리의 image -> 배포
- dockerfile 과 .dockerignore 두개의 파일로 image를 생성한다.
```dockerfile
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm i -D nodemon

RUN npm i -D pm2

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```
- docker build [OPTIONS]  -t [만들어질 image명[:TAG]] .
```bash
docker build -t bisang-book-store:1.0.0 .
#build 완료 후
docker run -it -p 3000:3000 --name bisang-bookstore bisang-bookstore:1.0.0
```



