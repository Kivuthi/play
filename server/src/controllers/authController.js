const db = require("../config/database");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            nationalId,
            password,
            passwordConfirmation,
        } = req.body ?? {};

        //required fields validation
        if (
            typeof fullName !== "string" || !fullName.trim() ||
            typeof username !== "string" || !username.trim() ||
            typeof email !== "string" || !email.trim() ||
            nationalId === undefined || nationalId === null || String(nationalId).trim() === "" ||
            typeof password !== "string" || !password.trim() ||
            typeof passwordConfirmation !== "string" || !passwordConfirmation.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        //username validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
            });
        }

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format."
            });
        }

        //nationalId validation
        const nationalIdRegex = /^\d{6,20}$/; // Assuming national ID is numeric and between 6 to 20 digits
        if (!nationalIdRegex.test(nationalId)) {
            return res.status(400).json({
                message: "National ID must be a numeric value between 6 to 20 digits."
            });
        }
        
        //password validation
        if(password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long."
            });
        }

        if(!/[A-Z]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one uppercase letter."
            });
        }

        if(!/[a-z]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one lowercase letter."
            });
        }

        if(!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one number."
            });
        }

        if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one special character."
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //password confirmation validation
        if(password !== passwordConfirmation) {
            return res.status(400).json({
                message: "Passwords do not match."
            });
        }

        // check user is already registered
        const existingUser = await db("users")
            .where({ username: username.trim() })
            .first();
            
        if (existingUser) {
            return res.status(400).json({
                message: "Username is already taken."
            });
        }

        const [userId] = await db("users").insert({
            fullName: fullName.trim(),
            username: username.trim(),
            nationalId: String(nationalId).trim(),
            email: email.trim(),
            password: hashedPassword,
        });
        //temporary response for testing purposes

        return res.status(200).json({
            message: "Registration successful.",
            user: {
                id: userId,
                fullName: fullName.trim(),
                username: username.trim(),
                nationalId: String(nationalId).trim(),
                email: email.trim()
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);

        return res.status(500).json({
            message: "An error occurred during registration. Please try again later."
        });
    }
};

module.exports = {
    register
};
