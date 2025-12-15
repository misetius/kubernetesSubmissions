FROM ubuntu

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN apt-get -y install curl

EXPOSE 8081

CMD [ "./script.sh" ]