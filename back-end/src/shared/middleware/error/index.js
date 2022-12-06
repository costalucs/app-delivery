function errorMiddleware(error, _req, res, _next) {
  console.log(error);
  return res.status(error.statusCode || 500).json({ message: error.message });
}

module.exports = { errorMiddleware };
