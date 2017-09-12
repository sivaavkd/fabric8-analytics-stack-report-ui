FROM registry.centos.org/centos/centos:7

MAINTAINER Mohammed Zeeshan Ahmed <moahmed@redhat.com>

RUN mkdir -p /opt/scripts /opt/app /var/www/html

WORKDIR /opt/app

ADD ./src /opt/app/src
ADD ./package.json /opt/app
ADD ./config /opt/app/config
ADD ./openshift /opt/app/openshift
ADD ./version_number.js /opt/app

ADD ./fix-permissions.sh ./install.sh ./passwd.template ./run.sh /opt/scripts/

RUN chmod -R 777 /opt/scripts && . /opt/scripts/install.sh

WORKDIR /var/www/html

EXPOSE 8080 8443

USER apache

ENTRYPOINT ["/opt/scripts/run.sh"]
CMD ["apache"]
