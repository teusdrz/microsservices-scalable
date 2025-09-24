FROM node:lts-alpine AS base



# --------

FROM base AS deps 

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev


# --------

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system api
RUN adduser --system -D -G api -u 1001 api

RUN chown api:api .
COPY --chown=api:api . .
COPY --from=deps /app/node_modules ./node_modules

USER api

EXPOSE 3333

ENV PORT=3333
ENV HOSTNAME="0.0.0.0"


ENTRYPOINT [ "npm", "run", "start" ]
