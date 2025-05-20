module.exports = {
  content: ["./assets/scss/**/*.{html,js,scss,pug}"],
  theme: {
    extend: {},
  },
  plugins: {
    "postcss-import": {},
    "tailwindcss": {},
    "autoprefixer": {},
  },
  
  //plugins: [require("tailwindcss"), require("autoprefixer")],
};
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
