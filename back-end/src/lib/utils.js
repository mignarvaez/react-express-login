import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const hashValue = async (value) => {
    return await bcrypt.hash(value, 10);
}

export const compareValues = async (inputValue, storedValue) => {
    return await bcrypt.compare(inputValue, storedValue);
}

export const getToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_KEY, { expiresIn: '3h' });
}

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token == "null") {  

            return res.status(403).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "server error" });
    }
}