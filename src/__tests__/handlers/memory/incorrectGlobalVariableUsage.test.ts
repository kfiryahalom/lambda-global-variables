import {
  _logger,
  incorrectGlobalVariableUsageHandler,
} from "~/handlers/memory/incorrectGlobalVariableUsage";

jest.mock("winston", () => {
  const originalModule = jest.requireActual("winston");
  return {
    ...originalModule,
    createLogger: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      defaultMeta: {},
    })),
  };
});

describe("memoryLeakHandler", () => {
  it("should update _logger.defaultMeta correctly", async () => {
    const firstEvent = {
      companyName: "CompanyA",
      userEmail: "userA@example.com",
    };

    const secondEvent = {
      companyName: "CompanyB",
      userEmail: "invalid-email",
    };

    await incorrectGlobalVariableUsageHandler(firstEvent);
    expect(_logger.defaultMeta).toEqual({ companyName: "CompanyA" });

    // Although the second event has companyName: "CompanyB", the defaultMeta didn't update
    // Therefore, the defaultMeta is still companyName: "CompanyA" which is wrong! (This is simple a memory leak example)
    await incorrectGlobalVariableUsageHandler(secondEvent);
    expect(_logger.defaultMeta).toEqual({ companyName: "CompanyA" });
  });
});
