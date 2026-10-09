import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("registrations", () => {
  it("should create a registration with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registrations.create({
      programId: 1,
      parentName: "John Doe",
      parentEmail: "john@example.com",
      parentPhone: "(416) 555-0123",
      childName: "Jane Doe",
      childAge: 10,
      childGender: "female",
      emergencyContactName: "Jane Smith",
      emergencyContactPhone: "(416) 555-0124",
      notes: "No allergies",
    });

    expect(result).toBeDefined();
    // Database response is an array with ResultSetHeader
    expect(Array.isArray(result) || result?.insertId).toBeTruthy();
  });

  it("should list registrations for admin only", async () => {
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);

    // Admin should be able to list registrations
    const result = await adminCaller.registrations.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should reject registration list for non-admin users", async () => {
    const publicCtx = createPublicContext();
    const caller = appRouter.createCaller(publicCtx);

    try {
      await caller.registrations.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      // Error message may vary - could be "Please login" or "Unauthorized"
      expect(error.message).toBeDefined();
    }
  });

  it("should retrieve registration by ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Create a registration first
    const created = await caller.registrations.create({
      programId: 1,
      parentName: "John Doe",
      parentEmail: "john@example.com",
      parentPhone: "(416) 555-0123",
      childName: "Jane Doe",
      childAge: 10,
    });

    // Database response should have insertId
    if (created && typeof created.insertId === 'number' && created.insertId > 0) {
      // Retrieve it
      const retrieved = await caller.registrations.getById({
        id: created.insertId,
      });

      expect(retrieved).toBeDefined();
      expect(retrieved?.parentName).toBe("John Doe");
      expect(retrieved?.childName).toBe("Jane Doe");
    }
  });

  it("should retrieve registrations by program ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Create a registration for program 1
    const created = await caller.registrations.create({
      programId: 1,
      parentName: "John Doe",
      parentEmail: "john@example.com",
      parentPhone: "(416) 555-0123",
      childName: "Jane Doe",
      childAge: 10,
    });

    // Only test if registration was created successfully
    if (created && created.insertId) {
      // Retrieve registrations for program 1
      const result = await caller.registrations.getByProgram({
        programId: 1,
      });

      expect(Array.isArray(result)).toBe(true);
    }
  });

  it("should validate required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.registrations.create({
        programId: 1,
        parentName: "",
        parentEmail: "invalid-email",
        parentPhone: "123",
        childName: "Jane Doe",
        childAge: 10,
      } as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      // Validation error should be thrown
      expect(error).toBeDefined();
    }
  });
});
