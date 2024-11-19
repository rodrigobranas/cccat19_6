import express from "express";
import cors from "cors";
import { AccountDAODatabase } from "./data";
import GetAccount from "./GetAccount";
import Signup from "./Signup";
import { MailerGatewayMemory } from "./MailerGateway";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async function (req, res) {
	const input = req.body;
	console.log("Signup", input);
	try {
		const accountDAO = new AccountDAODatabase();
		const mailerGateway = new MailerGatewayMemory();
		const signup = new Signup(accountDAO, mailerGateway);
		const output = await signup.signup(input);
		res.json(output);
	} catch (e: any) {
		res.status(422).json({ message: e.message });
	}
});

app.get("/accounts/:accountId", async function (req, res) {
	const accountDAO = new AccountDAODatabase();
	const getAccount = new GetAccount(accountDAO);
	const output = await getAccount.getAccount(req.params.accountId);
	res.json(output);
});

app.listen(3000);
