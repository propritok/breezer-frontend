FROM node:18-alpine

WORKDIR /app

# Build arguments for environment variables
ARG NEXT_PUBLIC_MAIL_ADDRESS
ARG NEXT_PUBLIC_MAIL_RECIPIENTS
ARG NEXT_PUBLIC_TELEPHONE
ARG MAIL_USER
ARG MAIL_PASSWORD



COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
