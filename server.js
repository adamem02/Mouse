const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const homeController = require('./controllers/homeController');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'supersecretsecret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(routes);
app.use('/', homeController);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
