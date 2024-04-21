"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarByMe from "@/components/navbar";
import Aos from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Loading from "@/components/loader/loading";
import TawkToChat from "@/components/Tawkto";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    Aos.init({ duration: 500, once: false, easing: "ease-in-out" }); // Initialize AOS on the client side
    setLoading(false); // Set loading to false after AOS initialization
  }, []); // Ensure the useEffect runs only once on component mount

  useEffect(() => {
    if (!loading) {
      const tawkScript = document.createElement("script");
      tawkScript.innerHTML = `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/66177997a0c6737bd12a9184/1hr5r5u5r';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `;
      document.head.appendChild(tawkScript);

      return () => {
        document.head.removeChild(tawkScript);
      };
    }
  }, [loading]);
  return (
    <html lang="en">
      <head>
        <title>Data Skills Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Data Skills Hub" />
        <meta
          name="description"
          content="Data Skills Hub: Your premier destination to master data science & analytics. Explore tutorials, resources & projects."
        />
        <meta
          name="keywords"
          content="Data Skills Hub, Data Science, Data Analytics , Data Analytics Tutorials, Projects"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="2 days" />
        <meta
          name="author"
          content="Developer: Meet Khetani, Graphics Designer : Yash Vadgama, Owner : Prayagraj Pandya"
        />
        <meta
          name="title"
          content="Data Science Internship | Data Skills Hub"
        />
        <meta
          name="description"
          content="Unlock your career potential with our Data Science Internship at Data Skills Hub! With our Pay After Placement Program, your success is assured. Start your journey today! 💼✨"
        />
        <meta
          name="title"
          content="Data Science Internship in Gujarat | Data Skills Hub"
        />
        <meta
          name="description"
          content="Explore Data Science Internship opportunities in Gujarat, including Rajkot and other cities, at Data Skills Hub. Join us and unlock your career potential! 💼✨"
        />
        <meta
          name="title"
          content="Data Analytics Internship | Data Skills Hub"
        />
        <meta
          name="description"
          content="Discover exciting Data Analytics Internship opportunities at Data Skills Hub. With our Pay After Placement Program, you can kickstart your career in data analytics today! 💼✨"
        />
        <meta
          name="title"
          content="Data Analytics Internship in Gujarat | Data Skills Hub"
        />
        <meta
          name="description"
          content="Find Data Analytics Internship opportunities in Gujarat, including Rajkot and other cities, at Data Skills Hub. Our Pay After Placement Program ensures your career success. Join us now! 💼✨"
        />
        <meta name="title" content="Data Science Course | Data Skills Hub" />
        <meta
          name="description"
          content="Enroll in our comprehensive Data Science Course at Data Skills Hub and unlock your potential in the field of data science. Start your journey towards a rewarding career today! "
        />
        <meta
          name="title"
          content="Data Science Course in Gujarat | Data Skills Hub"
        />
        <meta
          name="description"
          content="Discover Data Science Course opportunities in Gujarat, including Rajkot and other cities, at Data Skills Hub. Join our program and take the first step towards becoming a data science professional! 💼✨"
        />
        <meta name="title" content="Data Analytics Course | Data Skills Hub" />
        <meta
          name="description"
          content="Take our Data Analytics Course at Data Skills Hub and gain the skills needed for a successful career in data analytics. With our Pay After Placement Program, your career advancement is guaranteed! 💼✨"
        />
        <meta
          name="title"
          content="Data Analytics Course in Gujarat | Data Skills Hub"
        />
        <meta
          name="description"
          content="Explore Data Analytics Course opportunities in Gujarat, including Rajkot and other cities, at Data Skills Hub. Join us and pave the way for a rewarding career in data analytics! "
        />
        <meta name="title" content="SQL Course | Data Skills Hub" />
        <meta
          name="description"
          content="Learn SQL and enhance your data management skills with our comprehensive SQL Course at Data Skills Hub. Start your journey towards becoming a proficient SQL developer today! "
        />
        <meta name="title" content="PowerBI Course | Data Skills Hub" />
        <meta
          name="description"
          content="Master PowerBI with our specialized course at Data Skills Hub. Unlock new career opportunities in data visualization and analytics! 💼✨"
        />
        <meta
          name="title"
          content="Machine Learning Course | Data Skills Hub"
        />
        <meta
          name="description"
          content="Become proficient in Machine Learning with our hands-on course at Data Skills Hub. Kickstart your career in AI and data science today! 💼✨"
        />
        <meta name="title" content="AI Course | Data Skills Hub" />
        <meta
          name="description"
          content="Join our AI Course at Data Skills Hub and explore the latest advancements in artificial intelligence. Unlock exciting career opportunities in AI and machine learning! 💼✨"
        />
        <meta name="title" content="Generative AI Course | Data Skills Hub" />
        <meta
          name="description"
          content="Explore the creative potential of AI with our Generative AI Course at Data Skills Hub. Start your journey towards becoming an AI artist today! 💼✨"
        />
        <meta
          name="title"
          content="Business Analyst Course | Data Skills Hub"
        />
        <meta
          name="description"
          content="Become a proficient Business Analyst with our specialized course at Data Skills Hub. Unlock career opportunities in business intelligence and data analysis! 💼✨"
        />
        <meta
          name="title"
          content="Pay After Placement Programs | Data Skills Hub"
        />
        <meta
          name="description"
          content="Join our Pay After Placement Programs at Data Skills Hub and secure your future career. Explore opportunities in IT Jobs, Data Science Jobs, Data Analytics Jobs, AI Jobs, Business Analyst Jobs, Generative AI Jobs, Visualization Jobs, SQL Jobs, and more! 💼✨"
        />
        <meta name="title" content="IT Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Unlock exciting IT job opportunities with Data Skills Hub. Explore career paths in software development, cybersecurity, IT consulting, and more! 💼✨"
        />

        <meta name="title" content="Data Science Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Discover rewarding Data Science job opportunities with Data Skills Hub. Start your career journey in data analysis, machine learning, and AI today! 💼✨"
        />

        <meta name="title" content="Data Analytics Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Explore Data Analytics job opportunities with Data Skills Hub. Unlock career paths in data visualization, business intelligence, and data-driven decision making! "
        />

        <meta name="title" content="AI Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Find exciting AI job opportunities with Data Skills Hub. Start your career journey in artificial intelligence, deep learning, and natural language processing! 💼✨"
        />

        <meta name="title" content="Business Analyst Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Discover Business Analyst job opportunities with Data Skills Hub. Unlock career paths in data analysis, requirements gathering, and business process improvement! 💼✨"
        />

        <meta name="title" content="Generative AI Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Explore career opportunities in Generative AI with Data Skills Hub. Start your journey as an AI artist or creative technologist today! 💼✨"
        />

        <meta name="title" content="Visualization Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Unlock career opportunities in data visualization with Data Skills Hub. Start your journey as a data storyteller or visualization specialist today! 💼✨"
        />

        <meta
          name="keywords"
          content="Data Science Internship, Data Analytics Internship, , Data Science Course, data analytics course, analysis, udemy, data, Machine Learning Course, AI Course, Generative AI Course, Business Analyst Course, Pay After Placement, IT Jobs, Data Science Jobs, Data Analytics Jobs, AI Jobs, Business Analyst Jobs, Generative AI Jobs, Visualization Jobs, course, data analytics course, big data course, business analytics course, excel data analysis course, big data training, online learning, data analytics, analysis, data engineer, udemy, statistical, business analysis, certificate, course, data science, data analysis, teachable, data, data nerd, data storage, data analytics course, big data course, business analytics course, excel data analysis course, big data training, online learning, data analytics, analysis, data engineer, udemy, statistical, business analysis, certificate, course, data science, data analysis, teachable, data, data nerd, data storage, analytics, video course, python, coursera, college courses"
        />

        <meta name="title" content="SQL Jobs | Data Skills Hub" />
        <meta
          name="description"
          content="Find SQL job opportunities with Data Skills Hub. Start your career journey in database management, SQL development, and data querying! 💼✨"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,300,0,0"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/Icons/favicon.ico" />
      </head>
      <body
        className={` ${inter.className}  bg-[#f7f2f8] scroll-smooth overflow-x-hidden m-0 p-0 box-border`}
      >
        {loading ? (
          // Render skeleton or loading indicator while loading is true
          <div>
            <Loading />
          </div>
        ) : (
          <>
            <ChakraProvider>{children}</ChakraProvider>

            <Footer />
            <script
              src="https://unpkg.com/alpinejs@3.13.7/dist/cdn.min.js"
              defer
            ></script>
          </>
        )}
      </body>
    </html>
  );
}
