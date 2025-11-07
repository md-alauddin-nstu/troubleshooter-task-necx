export default function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  const status = err && (err.status || err.statusCode) ? (err.status || err.statusCode) : 500;
  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.name || "Error",
    message: err && err.message ? err.message : "An unexpected error occurred",
  });
}
