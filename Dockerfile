FROM rabbitmq:3.10-management-alpine

EXPOSE 5672 15672
ENV HOSTNAME rabbitmq

VOLUME /var/lib/rabbitmq/mnesia

RUN rabbitmq-plugins enable rabbitmq_management
RUN rm -f /etc/rabbitmq/conf.d/management_agent.disable_metrics_collector.conf

ENV RABBITMQ_DEFAULT_USER=admin
ENV RABBITMQ_DEFAULT_PASS=admin123

# ENV RABBITMQ_CONFIG_FILE /path/to/custom/rabbitmq.conf

CMD ["rabbitmq-server"]

# Comandos uteis
# docker build -t server-rabbitmq .
# docker run -d --name container-rabbitmq -p 5672:5672 -p 15672:15672 server-rabbitmq
# docker exec -it container-rabbitmq /bin/bash
# docker start container-rabbitmq