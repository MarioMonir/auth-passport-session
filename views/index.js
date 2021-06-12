const home = `<center><h1>Home</h1>
    <p><a href="/register">register</a></p>
    <p><a href="/login">login</a></p></center>
    `;

const login =
    '<center><h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br><br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form></center>';

const register =
    '<center><h1>Register Page</h1><form method="post" action="register">\
        Enter Username:<br><input type="text" name="username" required>\
        <br><br>Enter Password:<br><input type="password" name="password" required>\
        <br><br> Is admin<input type="checkbox" id="admin" name="admin" value=true>        <br><br><input type="submit" value="Submit"></form></center>';

const authenticated =
    '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>';

const unAuthenticated =
    '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>';

const loginSuccess =
    `<p>You successfully logged in.</p><br/> 
     <a href="/protected-route">Go to protected route</a><br />
     <a href="/admin-route">Go to admin route</a><br />
    `;

module.exports = {
    home,
    login,
    register,
    authenticated,
    unAuthenticated,
    loginSuccess,
};
