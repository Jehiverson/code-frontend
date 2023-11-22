import Carousel from "nuka-carousel"
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPlayer from "react-player";

// const files = [
//     { filename: "bknjetwsdgesqimwo3mf", type: "img" },
//     { filename: "rngiggrbj4eyi7ujyqp7", type: "img" },
//     { filename: "ujn2bijaho7kip4sakcy", type: "img" },
//     { filename: "awbvcnl1ud2pnvnonhz2", type: "img" },
//     { filename: "tivlkwujiwgpwunhmswp", type: "img" },
//     { filename: "ezjae8dhjqo4s9jinnkl", type: "img" },
//     { filename: "usae3yvehfqtmb41rung", type: "img" },
//     { filename: "pguduygsdzsnmmjvvj8v", type: "img" },
//     { filename: "wpsusfmazjvnpvpqagbs", type: "img" },
//     { filename: "arztl56kw6g2rqgdl5ei", type: "img" },
//     { filename: "zfwava8acd7xqiepb4ue", type: "img" },
//     { filename: "efxuluqclbswghg7nwmx", type: "img" },
//     { filename: "ikdh1uf1xbrss9ploq9l", type: "img" },
//     { filename: "spmt6nr9wmn479icqq7b", type: "img" },
//     { filename: "ze8kjglrsagcnkokug3y", type: "img" },
//     { filename: "einsglt4zmaaken9klui", type: "img" },
//     { filename: "dxyihurxplfnwuunm7ek", type: "img" },
//     { filename: "kn0ysytncutfvm7gjtgl", type: "img" },
//     { filename: "eq4uxgodbnx1c1cm0dca", type: "img" },
//     // { filename: "dtwh0lbd7nxsvmhohozp.mp4", type: "video" },
// ]

const Presentation = ({ files = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            console.log(currentSlide, files[currentSlide + 1])
            if (files[currentSlide + 1] && files[currentSlide + 1].idTypePresentation !== "video") {
                // videoRef.current.player.handlePause()
            }
        }
    }, [videoRef, currentSlide])

    return (
        <div className="border">
            <div className="container">
                {
                    files.length > 0 ? (
                        <Carousel
                            cellAlign="center"
                            adaptiveHeight={true}
                            adaptiveHeightAnimation={true}
                            beforeSlide={(currentSlide, endSlide) => setCurrentSlide(currentSlide)}
                            defaultControlsConfig={{
                                nextButtonText: <FiChevronRight />,
                                prevButtonText: <FiChevronLeft />,
                                pagingDotsClassName: "d-none",
                            }}
                            style={{ justifyContent: "center" }}
                        >
                            {
                                files.map(item => (
                                    item.idTypePresentation === "image" ? (
                                        <img
                                            className="img-fluid"
                                            // src={`https://res.cloudinary.com/dwjgahuls/image/upload/f_auto,q_auto/v1/CBC/${item.url}`}
                                            src={item.url}
                                        />
                                    ) : (
                                        <ReactPlayer
                                            ref={videoRef}
                                            // url='https://res.cloudinary.com/dwjgahuls/video/upload/v1700111493/CBC/dtwh0lbd7nxsvmhohozp.mp4'
                                            src={item.url}
                                        />
                                    )
                                ))
                            }
                        </Carousel>
                    ) : (
                        <div className="d-flex justify-content-center py-5">
                            <h6 className="text-muted fst-italic">No se encontró ningúna presentación</h6>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Presentation;