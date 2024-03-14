import Service from "./service.js";

const data = {
	username: `filipefalco-${Date.now()}`,
	password: "lasenha",
};

const service = new Service({
	filename: "./users.ndjson",
});

await service.create(data);

const users = await service.read();

console.log("users: ", users);
