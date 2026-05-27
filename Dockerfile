FROM registry.access.redhat.com/ubi9-minimal

RUN microdnf install -y nginx && microdnf clean all

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /opt/app-root/src /tmp/client_body /tmp/proxy /tmp/fastcgi /tmp/uwsgi /tmp/scgi && \
    chown -R 1001:0 /opt/app-root /tmp/client_body /tmp/proxy /tmp/fastcgi /tmp/uwsgi /tmp/scgi /var/log/nginx && \
    chmod -R g=u /opt/app-root /tmp/client_body /tmp/proxy /tmp/fastcgi /tmp/uwsgi /tmp/scgi /var/log/nginx

COPY --chown=1001:0 index.html style.css app.js version.txt redhat-favicon.png /opt/app-root/src/

USER 1001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
