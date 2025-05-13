import "dotenv/config";
import { expect } from "chai";
import sinon from "sinon";
import { getOneProperty } from "../_logic/index.js";
import { Property } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";
import { Types } from "mongoose";

const { ObjectId } = Types;
const { NotFoundError, SystemError } = errors;

describe("getOneProperty", () => {
  let validateStub;
  let findByIdStub;

  beforeEach(() => {
    validateStub = sinon.stub(validate, "id");
    findByIdStub = sinon.stub(Property, "findById");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("debería lanzar un error de validación si el propertyId no es válido", async () => {
    validateStub.throws(new Error("Invalid ID"));

    try {
      await getOneProperty("invalid-id");
    } catch (error) {
      expect(error.message).to.equal("Invalid ID");
    }

    expect(validateStub.calledOnceWith("invalid-id", "propertyId")).to.be.true;
  });

  it("debería lanzar un NotFoundError si no se encuentra la propiedad", async () => {
    const validObjectId = new ObjectId().toString();
    validateStub.returns();
    findByIdStub.returns({
      lean: sinon.stub().resolves(null), // Simular que no se encuentra la propiedad
    });

    try {
      await getOneProperty(validObjectId);
      // Si no lanza un error, fallar la prueba explícitamente
      throw new Error("La función no lanzó un NotFoundError");
    } catch (error) {
      // Verificar que el error sea una instancia de NotFoundError
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal(
        `Property with id ${validObjectId} not found`
      );
    }

    // Asegurarse de que se llamó correctamente al stub
    expect(findByIdStub.calledOnceWith(validObjectId)).to.be.true;
  });

  it("debería devolver la propiedad si se encuentra", async () => {
    const validObjectId = new ObjectId().toString();
    const mockProperty = { id: validObjectId, name: "Test Property" };

    validateStub.returns();
    findByIdStub.returns({
      lean: sinon.stub().resolves(mockProperty), // Simular la propiedad encontrada
    });

    const result = await getOneProperty(validObjectId);

    expect(result).to.deep.equal(mockProperty);
    expect(findByIdStub.calledOnceWith(validObjectId)).to.be.true;
  });

  it("debería lanzar un SystemError si ocurre un error inesperado", async () => {
    const validObjectId = new ObjectId().toString();
    validateStub.returns();
    findByIdStub.returns({
      lean: sinon.stub().rejects(new Error("Database error")), // Simular un error
    });

    try {
      await getOneProperty(validObjectId);
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal("Database error");
    }

    expect(findByIdStub.calledOnceWith(validObjectId)).to.be.true;
  });
});
