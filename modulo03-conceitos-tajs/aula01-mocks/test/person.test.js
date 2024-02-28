import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person";

describe("#Person Suite", () => {
	describe("#validate", () => {
		it("should throw if the name is not present", () => {
			const mockInvalidPerson = { name: "", cpf: "123.456.789-00" };

			expect(() => Person.validate(mockInvalidPerson)).toThrow(
				new Error("Name is required"),
			);
		});

		it("should throw if the cpf is not present", () => {
			const mockInvalidPerson = { name: "Ronaldo", cpf: "" };

			expect(() => Person.validate(mockInvalidPerson)).toThrow(
				new Error("CPF is required"),
			);
		});

		it("should not throw person is valid", () => {
			const mockInvalidPerson = { name: "Ronaldo", cpf: "123.456.789-00" };

			expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
		});
	});

	describe("format", () => {
		it("should format the person name and cpf", () => {
			// AAA
			// Arrange = Preparar
			const mockPerson = {
				name: "Ronaldo Oliveira da Silva",
				cpf: "123.456.789-00",
			};

			// Act = Executar
			const formattedPerson = Person.format(mockPerson);

			// Assert = Validar
			const expected = {
				cpf: "12345678900",
				name: "Ronaldo",
				lastName: "Oliveira da Silva",
			};

			expect(formattedPerson).toStrictEqual(expected);
		});
	});

	describe("process", () => {
		it("should process a valid person", () => {
			// a ideia é não retestar o que já foi testado

			const mockPerson = {
				name: "Ronaldo Oliveira da Silva",
				cpf: "123.456.789-00",
			};
			jest.spyOn(Person, Person.validate.name).mockReturnValue();
			jest.spyOn(Person, Person.format.name).mockReturnValue({
				cpf: "12345678900",
				name: "Ronaldo",
				lastName: "Oliveira da Silva",
			});

			const result = Person.process(mockPerson);

			const expected = "ok";
			expect(result).toStrictEqual(expected);
		});
	});

	describe("save", () => {
		it("should not throw if person is saved", () => {
			const mockPerson = {
				cpf: "123.456.789-00",
				name: "Ronaldo",
				lastName: "Oliveira da Silva",
			};

			expect(() => Person.save(mockPerson)).not.toThrow();
		});
	});
});
