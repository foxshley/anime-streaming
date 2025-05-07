import { logger as NiceLogger } from "@tqman/nice-logger";

export const logger = NiceLogger({
  mode: "live",
  withTimestamp: true,
  withBanner: true
});