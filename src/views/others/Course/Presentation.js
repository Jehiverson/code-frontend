import Carousel from "nuka-carousel"
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPlayer from "react-player";

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
                            adaptiveHeight={false}
                            adaptiveHeightAnimation={true}
                            beforeSlide={(currentSlide) => setCurrentSlide(currentSlide)}
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
                                            key={`IMG-${item.idPresentationItem}`}
                                            className="img-fluid"
                                            loading="lazy"
                                            // src={`https://res.cloudinary.com/dwjgahuls/image/upload/f_auto,q_auto/v1/CBC/${item.url}`}
                                            src={item.url}
                                            alt="PRESENTATION"
                                        />
                                    ) : (
                                        <ReactPlayer
                                            key={`VID-${item.idPresentationItem}`}
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