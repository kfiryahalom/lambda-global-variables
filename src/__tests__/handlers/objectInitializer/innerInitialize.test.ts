import { innerInitializeHandler } from "~/handlers/objectInitializer/innerInitialize";
import { outerInitializeHandler } from "~/handlers/objectInitializer/outerInitialize";
import { innerInitializeSingletonHandler } from "~/handlers/objectInitializer/innerInitializeSingleton";

/*
 * The following tests tries to demonstrate the difference
 * between the innerInitializeHandler and outerInitializeHandler
 * with the aspect of aws lambda's coldStart.
 *
 * For the demonstration, each test will call the handler 100 times.
 * each "object initialization" will simulate latency of 50ms.
 *
 * - The innerInitializeHandler initialize objects each call
 * - The outerInitializeHandler initialize objects once
 * - The innerInitializeSingletonHandler initialize objects once (on run time)
 * -- this is similar of using singleton pattern OR lazy initialize (if some of the calls doesn't require the object)
 *
 *
 * Running the following tests will show the difference run time between the handlers.
 * Keep in mind that the "coldStart" (initialization is not taking into account in the time result)
 */
describe("initialize_Handler", () => {
  const _runs = 100;
  const _event = {}; // Mock event

  describe("innerInitializeHandler", () => {
    it("success 10 runs", async () => {
      for (let i = 0; i < _runs; i++) {
        const result = await innerInitializeHandler(_event);
        expect(result).toBe("Success");
      }
    });
  });

  describe("outerInitializeHandler", () => {
    it("success 10 runs", async () => {
      for (let i = 0; i < _runs; i++) {
        const result = await outerInitializeHandler(_event);
        expect(result).toBe("Success");
      }
    });
  });

  describe("innerInitialize_singleton", () => {
    it("success 10 runs", async () => {
      for (let i = 0; i < _runs; i++) {
        const result = await innerInitializeSingletonHandler(_event);
        expect(result).toBe("Success");
      }
    });
  });
});
