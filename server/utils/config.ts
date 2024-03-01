class CustomConfig {
  private data;

  constructor() {
    this.data = process.env;

    for (const key in this.data) {
      if (this.data[key] === "true") {
        this.data[key] = true;
      } else if (this.data[key] === "false") {
        this.data[key] = false;
      } else if (Number.isInteger(this.data[key])) {
        this.data[key] = parseInt(this.data[key]);
      }
    }
  }

  get isDev() {
    return this.data.DEV;
  }

  get port() {
    return this.data.PORT;
  }

  get mongoDbConnetcionString() {
    return this.data.MONGODB_CONNECTION_STRING;
  }
}

export default CustomConfig;
