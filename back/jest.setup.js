const pino = require("pino");

jest.mock("./src/logger/pino", () => {
	const logger = pino({
		level: "silent",
	});

	return {
		__esModule: true,
		default: logger,
	};
});
