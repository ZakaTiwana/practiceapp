class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message; 
    }
  }

  const handleError = (err, res) => {
    statusCode = err.statusCode || 500;
    const message = err.message;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };
  
  module.exports = {
    ErrorHandler,
    handleError
  }
  