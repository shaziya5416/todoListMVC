module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'homeBG': '#f5f5f5',
      }
    },
  },
  plugins: [require("daisyui")],
}