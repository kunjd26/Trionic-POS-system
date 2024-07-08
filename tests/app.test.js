import app from "../app";
import request from "supertest";
import { describe, expect, it } from "vitest";

const token = "bfa56239-fe00-4710-80cf-82bfd7b7d36c";
let objectId;

// Product Categories
describe("Product categories API endpoint.", () => {
    it("should create a product category", async () => {
        const res = await request(app).post("/api/product-categories").send({
            "title": "Foo name",
            "description": "Foo description"
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all product categories", async () => {
        const res = await request(app)
            .get("/api/product-categories")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return a product category", async () => {
        const res = await request(app)
            .get(`/api/product-categories/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a product category", async () => {
        const res = await request(app)
            .put(`/api/product-categories/${objectId}`)
            .send({
                "title": "Foo name new",
                "description": "Foo description new"
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete a product category", async () => {
        const res = await request(app).delete(`/api/product-categories/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Product stores
describe("Product stores API endpoint.", () => {
    it("should create a product store", async () => {
        const res = await request(app).post("/api/product-stores").send({
            "name": "Foo name",
            "address": "Foo address",
            "postalCode": "123456",
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all product stores", async () => {
        const res = await request(app)
            .get("/api/product-stores")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return a product store", async () => {
        const res = await request(app)
            .get(`/api/product-stores/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a product store", async () => {
        const res = await request(app)
            .put(`/api/product-stores/${objectId}`)
            .send({
                "name": "Foo name new",
                "address": "Foo address new",
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete a product store", async () => {
        const res = await request(app).delete(`/api/product-stores/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Products
describe("Product API endpoints", () => {
    it("should create a product", async () => {
        const res = await request(app).post("/api/products").send({
            "name": "Foo name",
            "description": "Foo description",
            "barcode": "1234567890123",
            "weight": 123,
            "productCategoryId": "668912926458684a31c48e60"
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all products", async () => {
        const res = await request(app)
            .get("/api/products")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return a products", async () => {
        const res = await request(app)
            .get(`/api/products/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a product", async () => {
        const res = await request(app)
            .put(`/api/products/${objectId}`)
            .send({
                "name": "Foo name new",
                "description": "Foo description new"
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a product", async () => {
        const res = await request(app)
            .put(`/api/products/${objectId}`)
            .send({
                "name": "Foo name new",
                "description": "Foo description new"
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Providers
describe("Provider API endpoints.", () => {
    it("should create a provider", async () => {
        const res = await request(app).post("/api/providers").send({
            "name": "Foo name",
            "address": "Foo address",
            "postalCode": "123456",
            "phone": "9876543210"
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all providers", async () => {
        const res = await request(app)
            .get("/api/providers")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return a provider", async () => {
        const res = await request(app)
            .get(`/api/providers/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a provider", async () => {
        const res = await request(app)
            .put(`/api/providers/${objectId}`)
            .send({
                "name": "Foo name new",
                "address": "Foo address new",
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete a provider", async () => {
        const res = await request(app).delete(`/api/providers/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Inventory
describe("Inventory API endpoints.", () => {
    it("should create an inventory", async () => {
        const res = await request(app).post("/api/inventories").send({
            "productId": "6689144d6458684a31c48ee7",
            "productStoreId": "668913286458684a31c48e93",
            "providerId": "668915c26458684a31c48f42",
            "price": 123,
            "quantityUnit": "kilogram",
            "availableQuantity": 20000,
            "minimumQuantityLimit": 5000,
            "maximumQuantityLimit": 25000
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all inventories", async () => {
        const res = await request(app)
            .get("/api/inventories")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return an inventory", async () => {
        const res = await request(app)
            .get(`/api/inventories/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update an inventory", async () => {
        const res = await request(app)
            .put(`/api/inventories/${objectId}`)
            .send({
                "price": 234,
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete an inventory", async () => {
        const res = await request(app).delete(`/api/inventories/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Customers
describe("Customer API endpoints.", () => {
    it("should create a customer", async () => {
        const res = await request(app).post("/api/customers").send({
            "name": "foo name",
            "gender": "female",
            "email": "foo@foo.foo",
            "phone": "9845632178",
            "address": "foo address",
            "postalCode": "123456"
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all customers", async () => {
        const res = await request(app)
            .get("/api/customers")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return a customer", async () => {
        const res = await request(app)
            .get(`/api/customers/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update a customer", async () => {
        const res = await request(app)
            .put(`/api/customers/${objectId}`)
            .send({
                "name": "Foo name new",
                "address": "Foo address new",
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete a customer", async () => {
        const res = await request(app).delete(`/api/customers/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});



// Orders
describe("Order API endpoints.", () => {
    it("should create an order", async () => {
        const res = await request(app).post("/api/orders").send({
            "orderDate": "2023-06-06T00:00:00.000Z",
            "orderType": "offline",
            "status": "processing",
            "orderDetails": [
                {
                    "inventoryId": "668919076458684a31c48fa7",
                    "quantity": 2
                }
            ]
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all orders", async () => {
        const res = await request(app)
            .get("/api/orders")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return an order", async () => {
        const res = await request(app)
            .get(`/api/orders/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update an order", async () => {
        const res = await request(app)
            .put(`/api/orders/${objectId}`)
            .send({
                "status": "completed"
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete an order", async () => {
        const res = await request(app).delete(`/api/orders/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});


// Invoice
describe("Invoice API endpoints.", () => {
    it("should create an invoice", async () => {
        const res = await request(app).post("/api/invoices").send({
            "customerId": "668914d86458684a31c48f00",
            "orderId": "66891e0ac6fe1afe7c297231",
            "invoiceDate": "2023-06-01T00:00:00.000Z",
            "tax": 18,
            "discount": 10,
            "paymentType": "upi"
        }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe("success");
        objectId = res.body.data._id;
    });

    it("should return all invoices", async () => {
        const res = await request(app)
            .get("/api/invoices")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should return an invoice", async () => {
        const res = await request(app)
            .get(`/api/invoices/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should update an invoice", async () => {
        const res = await request(app)
            .put(`/api/invoices/${objectId}`)
            .send({
                "paymentType": "cash"
            }).set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });

    it("should delete an invoice", async () => {
        const res = await request(app).delete(`/api/invoices/${objectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
    });
});
