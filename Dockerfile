FROM node:18-alpine
WORKDIR /app

# build args для клиентских переменных (используются во время yarn build)
ARG NEXT_PUBLIC_MAIL_ADDRESS
ARG NEXT_PUBLIC_MAIL_RECIPIENTS
ARG NEXT_PUBLIC_TELEPHONE

# Сделаем их доступными как ENV в процессе сборки
ENV NEXT_PUBLIC_MAIL_ADDRESS=${NEXT_PUBLIC_MAIL_ADDRESS}
ENV NEXT_PUBLIC_MAIL_RECIPIENTS=${NEXT_PUBLIC_MAIL_RECIPIENTS}
ENV NEXT_PUBLIC_TELEPHONE=${NEXT_PUBLIC_TELEPHONE}

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
