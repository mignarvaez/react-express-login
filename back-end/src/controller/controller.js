import { insertValue, queryValue, queryId } from "../lib/db.js";
import { getToken, hashValue, compareValues } from "../lib/utils.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const dbResponse = await queryValue(email);
        if (dbResponse.length > 0) {
            return res.status(409).json({ message: "Email already registered" })
        }

        const hashedPassword = await hashValue(password);
        await insertValue([username, email, hashedPassword]);
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const dbResponse = await queryValue(email);
        if (dbResponse.length == 0) {
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await compareValues(password, dbResponse[0].password);
        if (!isMatch)
            return res.status(401).json({ message: "Wrong credentials" });

        return res.status(201).json({ token: getToken(dbResponse[0].id) })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const home = async (req, res) => {
    try {
        const dbResponse = await queryId(req.userId);
        if (dbResponse.length == 0) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(201).json({ user: dbResponse[0] })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
