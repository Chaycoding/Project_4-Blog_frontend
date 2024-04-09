/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        balloons: `url(/src/components/images/high quality/bal.webp)`,
        tower: `url(/src/components/images/high quality/thatimg.webp)`,
        loginn: `url(/src/components/images/high quality/login.webp)`,
      },
    },
  },
  plugins: [],
};
