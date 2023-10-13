import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
   
  function Banner() {
    return (
        <Card
        shadow={false}
        className="relative  h-screen w-[98.9vw] rounded-none items-end justify-center overflow-hidden text-center"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="inset-0 m-0  rounded-none w-[98.9vw] h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')]"
        >
            
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 via-black/50" />
          <div className="flex justify-end items-center h-full">

          <Typography
            variant="h1"
            color="white"
            className="mb-12 font-sans leading-[1.5] z-10 text-right pe-16"
            >
            Where Care <br/>
            Knows No Boundaries
          </Typography>
              </div>

        </CardHeader>

      </Card>
      
    );
  }
  export default Banner

// import React, { useRef, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import "./Banner.css";

// const Banner = () => {
//   const slideRef = useRef(null);
//   const [loadingProgress, setLoadingProgress] = useState(0);

//   const handleClickNext = () => {
//     let items = slideRef.current.querySelectorAll(".item");
//     slideRef.current.appendChild(items[0]);
//   };

//   const handleClickPrev = () => {
//     let items = slideRef.current.querySelectorAll(".item");
//     slideRef.current.prepend(items[items.length - 1]);
//   };

//   const data = [
//     {
//       id: 1,
//       imgUrl: "https://i.postimg.cc/PrMGqZwx/pexels-m-venter-1659437.jpg",
//       desc: "Some beautiful roads cannot be discovered without getting loss.",
//       name: "EXPLORE NATURE",
//     },
//     {
//       id: 2,
//       imgUrl:
//         "https://i.postimg.cc/bw6KxhLf/pexels-eberhard-grossgasteiger-1062249.jpg",
//       desc: "Some beautiful roads cannot be discovered without getting loss.",
//       name: "EXPLORE NATURE",
//     },
//     {
//       id: 3,
//       imgUrl:
//         "https://i.postimg.cc/CMkTW9Mb/pexels-eberhard-grossgasteiger-572897.jpg",
//       desc: "Some beautiful roads cannot be discovered without getting loss.",
//       name: "EXPLORE NATURE",
//     },
//     {
//       id: 5,
//       imgUrl: "https://i.postimg.cc/6qdkn4bM/pexels-joyston-judah-933054.jpg",
//       desc: "Some beautiful roads cannot be discovered without getting loss.",
//       name: "EXPLORE NATURE",
//     },
//     {
//       id: 6,
//       imgUrl:
//         "https://i.postimg.cc/RVm59Gqy/pexels-roberto-nickson-2559941.jpg",
//       desc: "Some beautiful roads cannot be discovered without getting loss.",
//       name: "EXPLORE NATURE",
//     },
//   ];

//   return (
//     <div className="container">
//       <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
//       <div id="slide" ref={slideRef}>
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="item"
//             style={{ backgroundImage: `url(${item.imgUrl})` }}
//           >
//             <div className="content">
//               <div className="name">{item.name}</div>
//               <div className="des">{item.desc}</div>
//               <button>See more</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="buttons">
//         <button id="prev" onClick={handleClickPrev}>
//           <FontAwesomeIcon icon={faAngleLeft} />
//         </button>
//         <button id="next" onClick={handleClickNext}>
//           <FontAwesomeIcon icon={faAngleRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner