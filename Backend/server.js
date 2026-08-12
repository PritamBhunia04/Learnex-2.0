import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

import connection from './config/db.js';
import stdModel from './models/student.js';
import doubtModel from './models/doubt.js';
import instModel from './models/instructor.js';

const app = express();

// Render provides PORT automatically.
// Locally it will use port 3000.
const port = process.env.PORT || 3000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());


// =====================================================
// CORS CONFIGURATION
// =====================================================

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://learnex-2-0.vercel.app',
        'https://learnex-frontend.onrender.com'
    ],

    methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],

    credentials: true
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));


// =====================================================
// HOME / HEALTH CHECK
// =====================================================

app.get('/', (req, res) => {
    res.status(200).send('Learnex Backend is running successfully!');
});


// =====================================================
// STUDENT SIGNUP
// =====================================================

app.post('/stdsignup', async (req, res) => {
    try {

        const {
            studentName,
            studentEmail,
            parentEmail,
            phoneNo,
            standard,
            password,
            confirmPassword
        } = req.body;


        // -----------------------------
        // Validate required fields
        // -----------------------------

        if (
            !studentName ||
            !studentEmail ||
            !parentEmail ||
            !phoneNo ||
            !standard ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }


        // -----------------------------
        // Check password match
        // -----------------------------

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }


        // -----------------------------
        // Check existing student
        // -----------------------------

        const existingUser = await stdModel.findOne({
            studentEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'User with this email already exists'
            });
        }


        // -----------------------------
        // Hash password
        // -----------------------------

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(
            password,
            saltRounds
        );


        // -----------------------------
        // Create student
        // -----------------------------

        await stdModel.create({
            studentName,
            studentEmail,
            parentEmail,
            phoneNo,
            standard,
            password: hashedPassword,

            // Keeping this because your
            // existing model appears to use it.
            confirmPassword: hashedPassword
        });


        // -----------------------------
        // Send success response
        // -----------------------------

        return res.status(201).json({
            message: 'Account created successfully'
        });

    } catch (error) {

        console.error('Student signup failed:', error);

        return res.status(500).json({
            message: 'Failed to create student account'
        });
    }
});


// =====================================================
// STUDENT LOGIN
// =====================================================

app.post('/stdlogin', async (req, res) => {
    try {

        console.log('Student login request:', req.body);

        const {
            studentEmail,
            password
        } = req.body;


        // -----------------------------
        // Validate fields
        // -----------------------------

        if (!studentEmail || !password) {
            return res.status(400).json({
                message: 'Student email and password are required'
            });
        }


        // -----------------------------
        // Find student
        // -----------------------------

        const existingUser = await stdModel.findOne({
            studentEmail
        });


        // -----------------------------
        // Student not found
        // -----------------------------

        if (!existingUser) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }


        // -----------------------------
        // Compare password
        // -----------------------------

        const comparePassword = await bcrypt.compare(
            password,
            existingUser.password
        );


        if (!comparePassword) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }


        // -----------------------------
        // Successful login
        // -----------------------------

        return res.status(200).json({
            message: 'Welcome to LearneX!!'
        });

    } catch (error) {

        console.error('Student login failed:', error);

        return res.status(500).json({
            message: 'Failed to login student'
        });
    }
});


// =====================================================
// DOUBTS API
// =====================================================


// -----------------------------------------------------
// Create a doubt
// -----------------------------------------------------

app.post('/doubts', async (req, res) => {

    try {

        const {
            title,
            description,
            course,
            tags = [],
            authorEmail,
            status = 'pending'
        } = req.body;


        if (
            !title ||
            !description ||
            !course ||
            !authorEmail
        ) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }


        const created = await doubtModel.create({
            title,
            description,
            course,
            tags,
            authorEmail,
            status
        });


        return res.status(201).json(created);

    } catch (error) {

        console.error(
            'Create doubt failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to create doubt'
        });
    }
});


// -----------------------------------------------------
// Get doubts
// -----------------------------------------------------

app.get('/doubts', async (req, res) => {

    try {

        const {
            course,
            status,
            search,
            email
        } = req.query;

        const query = {};


        if (course) {
            query.course = course;
        }


        if (status) {
            query.status = status;
        }


        if (email) {
            query.authorEmail = email;
        }


        if (search) {

            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }


        const items = await doubtModel
            .find(query)
            .sort({ createdAt: -1 });


        return res.json(items);

    } catch (error) {

        console.error(
            'List doubts failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to fetch doubts'
        });
    }
});


// -----------------------------------------------------
// Add reply to doubt
// -----------------------------------------------------

app.post('/doubts/:id/replies', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            authorEmail,
            content
        } = req.body;


        if (!authorEmail || !content) {
            return res.status(400).json({
                message: 'Missing fields'
            });
        }


        const updated = await doubtModel.findByIdAndUpdate(
            id,

            {
                $push: {
                    replyList: {
                        authorEmail,
                        content
                    }
                },

                $inc: {
                    replies: 1
                },

                $set: {
                    status: 'in_discussion'
                }
            },

            {
                new: true
            }
        );


        if (!updated) {
            return res.status(404).json({
                message: 'Doubt not found'
            });
        }


        return res.status(201).json(updated);

    } catch (error) {

        console.error(
            'Add reply failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to add reply'
        });
    }
});


// -----------------------------------------------------
// Fetch replies
// -----------------------------------------------------

app.get('/doubts/:id/replies', async (req, res) => {

    try {

        const { id } = req.params;


        const doubt = await doubtModel.findById(
            id,
            {
                replyList: 1,
                replies: 1
            }
        );


        if (!doubt) {
            return res.status(404).json({
                message: 'Doubt not found'
            });
        }


        return res.json({
            replies: doubt.replyList,
            count: doubt.replies
        });

    } catch (error) {

        console.error(
            'Get replies failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to fetch replies'
        });
    }
});


// -----------------------------------------------------
// Update doubt status
// -----------------------------------------------------

app.patch('/doubts/:id/status', async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;


        const allowedStatuses = [
            'pending',
            'in_discussion',
            'resolved'
        ];


        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                message: 'Invalid status'
            });
        }


        const updated = await doubtModel.findByIdAndUpdate(
            id,

            {
                status
            },

            {
                new: true
            }
        );


        if (!updated) {

            return res.status(404).json({
                message: 'Doubt not found'
            });
        }


        return res.json(updated);

    } catch (error) {

        console.error(
            'Update status failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to update status'
        });
    }
});


// =====================================================
// INSTRUCTOR LOGIN
// =====================================================

app.post('/inslogin', async (req, res) => {

    try {

        const {
            teacherId,
            password
        } = req.body;


        if (!teacherId || !password) {

            return res.status(400).json({
                message:
                    'teacherId and password are required'
            });
        }


        const instructor = await instModel.findOne({
            teacherId
        });


        if (!instructor) {

            return res.status(404).json({
                message: 'Instructor not found'
            });
        }


        // Your existing system stores instructor
        // password as plain text.
        // Keeping the same behavior here so
        // existing instructor accounts continue
        // to work.

        const passwordCorrect =
            instructor.password === password;


        if (!passwordCorrect) {

            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }


        const payload = {

            id: instructor._id,

            teacherId: instructor.teacherId,

            name: instructor.name,

            title: instructor.title,

            teacherEmail:
                instructor.teacherEmail || '',

            phone: instructor.phone,

            totalPlans:
                instructor.totalPlans || []
        };


        return res.status(200).json({

            message: 'Login successful',

            instructor: payload

        });

    } catch (error) {

        console.error(
            'Instructor login failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to login instructor'
        });
    }
});


// =====================================================
// FETCH INSTRUCTOR DETAILS
// =====================================================

app.get('/instructors/:id', async (req, res) => {

    try {

        const { id } = req.params;


        // Try MongoDB ObjectId first
        const byObjectId =
            await instModel
                .findById(id)
                .lean()
                .catch(() => null);


        // If not found, try teacherId
        const doc =
            byObjectId ||
            await instModel
                .findOne({
                    teacherId: id
                })
                .lean();


        if (!doc) {

            return res.status(404).json({
                message: 'Instructor not found'
            });
        }


        const payload = {

            id: doc._id,

            teacherId: doc.teacherId,

            name: doc.name,

            title: doc.title,

            teacherEmail:
                doc.teacherEmail || '',

            phone: doc.phone,

            totalPlans:
                doc.totalPlans || []
        };


        return res.json(payload);

    } catch (error) {

        console.error(
            'Get instructor failed:',
            error
        );

        return res.status(500).json({
            message: 'Failed to fetch instructor'
        });
    }
});


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {

    res.status(404).json({
        message: `Route ${req.method} ${req.originalUrl} not found`
    });

});


// =====================================================
// START SERVER
// =====================================================

app.listen(port, () => {

    console.log(
        `Learnex Backend is running on port ${port}`
    );

    console.log(
        `Local URL: http://localhost:${port}`
    );

});