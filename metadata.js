module.exports = {
  helpers: {
    if_or: function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name",
    },
    description: {
      type: "string",
      required: false,
      message: "Project description",
    },
    author: {
      type: "string",
      message: "Author",
    },
  },
  filters: {},
  completeMessage:
    "To get started:\n\n  {{^inplace}}cd {{destDirName}}\n  {{/inplace}}npm install\n  npm start\n\n",
};
