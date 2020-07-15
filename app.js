const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
var passport = require('passport');

/* CORE */

const authRouter = require('./routes/core/auth');
const usersRouter = require('./routes/core/users');
const category = require('./routes/core/category')
const subCategory = require('./routes/taskandearn/subCategory')
const Task = require('./routes/taskandearn/task')
const Professional = require('./routes/taskandearn/professionals')

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const app = express();

const originsWhitelist = [
    ''
];

originsWhitelist.push('http://localhost:4200');
originsWhitelist.push('http://localhost:8000');
originsWhitelist.push('https://taskandearn-dev.herokuapp.com');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/home', express.static('dist/taskandearn'));
app.use('/login', express.static('dist/taskandearn'));
app.use('/registration', express.static('dist/taskandearn'));

// app.use('/employee/edashboard', express.static('dist'));
// app.use('/employee/eprofile', express.static('dist'));
// app.use('/employee/month-view', express.static('dist'));
// app.use('/employee/manage-leave', express.static('dist'));
// app.use('/employee/backlog', express.static('dist'));
// app.use('/employee/task/:id', express.static('dist'));
// app.use('/employee/todo', express.static('dist'));
// app.use('/employee/todo/:id', express.static('dist'));
// app.use('/employee/todo/completed/:id', express.static('dist'));
// app.use('/employee/payslip', express.static('dist'));

// app.use('/admin/adashboard', express.static('dist'));
// app.use('/admin/aprofile', express.static('dist'));
// app.use('/admin/leave-request', express.static('dist'));
// app.use('/admin/admin-employee', express.static('dist'));
// app.use('/admin/manage-time', express.static('dist'));
// app.use('/admin/backlog', express.static('dist'));


// app.use('/systemadmin/sadashboard', express.static('dist'));
// app.use('/systemadmin/admin', express.static('dist'));
// app.use('/systemadmin/notification', express.static('dist'));
// app.use('/systemadmin/holiday', express.static('dist'));
// app.use('/systemadmin/dayoff', express.static('dist'));
// app.use('/systemadmin/ManagePayslip/:id', express.static('dist'));
// app.use('/systemadmin/downloadPdf', express.static('dist'));

app.use(express.static('dist/taskandearn'));
app.use(cookieParser());

//Enabling CORS

app.use(cors({
    origin: (origin, callback) => {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}));

app.use(passport.initialize());
require('./config/passport')(passport);

//Public routes
app.use('/api/auth', authRouter);

//Private routes.
// app.use(authMiddleware.verifyToken);

/* CORE */

// app.use('/api/user', /*roleMiddleware,*/ usersRouter);
app.use('/api/users', authRouter)
// app.use('/api/organization', organizationRouter);
// app.use('/api/userMeta', passport.authenticate('jwt', { session: false }), /*roleMiddleware,*/ userMetaRouter);
// app.use('/api/orgMeta',   /*roleMiddleware,*/ orgMetaRouter);
// app.use('/api/mail', mailRouter);

/* softobotics */

app.use('/api/user', usersRouter);
app.use('/api/category', category);
app.use('/api/subcategory', subCategory)
app.use('/api/task', Task)
app.use('/api/professionals', Professional)

// app.use('/api/task', passport.authenticate('jwt', { session: false }), taskRouter);
// app.use('/api/comment', passport.authenticate('jwt', { session: false }), commentRouter);
// app.use('/api/leave', passport.authenticate('jwt', { session: false }), Leave);
// app.use('/api/holiday', passport.authenticate('jwt', { session: false }), Holiday);
// app.use('/api/dayoff', passport.authenticate('jwt', { session: false }), Dayoff);
// app.use('/api/todo', passport.authenticate('jwt', { session: false }), todoRouter);
// app.use('/api/weekday', passport.authenticate('jwt', { session: false }), Weekday);
// app.use('/api/userInfo', passport.authenticate('jwt', { session: false }), UserInfoRouter);
// app.use('/api/payslip', passport.authenticate('jwt', { session: false }), PayslipRouter);
// app.use('/api/registration', usersRouter)

// error handler, don't remove next

app.use(function (err, req, res, next) {
    let errorCode = '';
    const errorCodes = [
        'MISSING_USERNAME',
        'MISSING_PASSWORD',
        'INVALID_USERNAME',
        'INVALID_PASSWORD',
        'INVALID_EMAIL',
        'PERMISSION_DENIED',
        'MISSING_EMAIL',
    ];

    switch (err.name) {
        case 'TokenExpiredError':
            errorCode = 'expired_token';
            break;
        case 'JsonWebTokenError':
            errorCode = 'invalid_token';
            break;
        case 'SequelizeUniqueConstraintError':
            errorCode = 'duplicated_' + Object.keys(err.fields)[0];
            break;
        case 'SequelizeDatabaseError':
            errorCode = 'invalid_inputs';
            break;
        default:
            errorCode = 'unrecognized';
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        errorCode = 'INCORRECT_FILE_SIZE';
    }
    if (err.message && errorCodes.includes(err.message.toUpperCase())) {
        errorCode = err.message;
    }
    res.json({
        success: false,
        error: {
            name: errorCode.toUpperCase()
        }
    });
});

module.exports = app;