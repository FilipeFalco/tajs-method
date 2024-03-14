import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import crypto from "node:crypto";
import Service from "../src/service";
import fs from "node:fs/promises";
import fsSync from "node:fs";

describe("Service Test Suite", () => {
	let _service;
	const filename = "testfile.ndjson";
	const MOCKET_HASH_PWD = "hashedpassword";

	describe("#create - spies", () => {
		beforeEach(() => {
			jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
				update: jest.fn().mockReturnThis(),
				digest: jest.fn().mockReturnValue(MOCKET_HASH_PWD),
			});

			jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();

			jest.spyOn(fsSync, fsSync.existsSync.name).mockReturnValue(true);

			_service = new Service({
				filename,
			});
		});

		it("should call appendFile with right params", async () => {
			const input = {
				username: "testuser",
				password: "testpassword",
			};
			const expectedCreatedAt = new Date().toDateString();
			// Arrange
			jest
				.spyOn(Date.prototype, Date.prototype.toISOString.name)
				.mockReturnValue(expectedCreatedAt);

			// Act
			await _service.create(input);

			// Assert
			expect(crypto.createHash).toHaveBeenCalledWith("sha256");

			const hash = crypto.createHash("sha256");
			expect(hash.update).toHaveBeenCalledWith(input.password);
			expect(hash.digest).toHaveBeenCalledWith("hex");

			const expected = JSON.stringify({
				...input,
				createdAt: expectedCreatedAt,
				password: MOCKET_HASH_PWD,
			}).concat("\n");

			expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
		});
	});
});
