const Accounts = require('./app/controllers/accounts');
const Stadiums = require('./app/controllers/stadiums');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'POST', path: '/contribute', config: Stadiums.contribute },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    { method: 'GET', path: '/editstadium/{id}', config: Stadiums.showStadium },
    { method: 'POST', path: '/editstadium/{id}', config: Stadiums.updateStadium },
    { method: 'GET', path: '/deletestadium/{id}', config: Stadiums.deleteStadium },
    { method: 'POST', path: '/uploadfile/{id}', config: Stadiums.uploadFile },
    { method: 'GET', path: '/home', config: Stadiums.home },
    { method: 'GET', path: '/report', config: Stadiums.report },
    { method: 'GET', path: '/userreport', config: Accounts.userreport },
    { method: 'GET', path: '/deleteuser/{id}', config: Accounts.deleteUser },
    { method: 'GET', path: '/edituser/{id}', config: Accounts.adminshowSettings },
    { method: 'POST', path: '/edituser/{id}', config: Accounts.adminupdateSettings },
    { method: 'GET', path: '/stadiumupload/{id}', config: Stadiums.uploadstadiumimages },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: {auth: false}
    }
];