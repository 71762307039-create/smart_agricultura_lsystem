# Lightweight Linux-based Nginx image serves the static web application.
FROM nginx:1.27-alpine
LABEL org.opencontainers.image.title="AgriSmart Smart Agricultural System"
LABEL org.opencontainers.image.description="Crop health and yield dashboard demo"
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
