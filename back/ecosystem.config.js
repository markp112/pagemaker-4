module.exports = {
	apps: [
		{
			name: "TSServer",
			script: "ts-node",
			args: ".app.ts", // replace this with your project's entry file
			env_qa: {
				PORT: 3000,
				NODE_ENV: "production",
			},
		},
	],
};
