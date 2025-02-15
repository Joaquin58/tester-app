import { config } from 'npm:dotenv';
config({ path: "./.env" })
import { Sequelize } from 'npm:sequelize';
import fs from 'node:fs';
import { basename as _basename, dirname, join } from 'node:path';
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, NODE_ENV
} = Deno.env.toObject();

let sequelize =
  NODE_ENV === "production"
    ? new Sequelize({
      database: DB_NAME,
      dialect: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          // Ref.: https://github.com/brianc/node-postgres/issues/2009
          rejectUnauthorized: false,
        },
        keepAlive: true
      },
      ssl: true,
    })
    : new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require`,
      { logging: false, native: false }
    );
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = _basename(__filename);

const modelDefiners = [];

fs.readdirSync(join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(import(`./models/${file}`).then((model) => model.default))
  })

await Promise.all(modelDefiners).then((models) => {
  models.forEach((model) => model(sequelize));
  // Capitalizamos los nombres de los modelos ie: product => Product
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);
  const { Videogame, Genre } = sequelize.models;

  // Aca vendrian las relaciones
  // Product.hasMany(Reviews);
  Videogame.belongsToMany(Genre, { through: 'VideogameGenre', timestamps: false })
  Genre.belongsToMany(Videogame, { through: 'VideogameGenre', timestamps: false })
})


export const conn = sequelize
export default {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
};
