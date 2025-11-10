FROM oven/bun
COPY . .
RUN bun install
RUN bun test
RUN bun run build
CMD ["bun", "start"]