var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  // port local
  process.env.PORT = 3000;
  // akses ke database
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
