import { useEffect, useState } from "react";
import CourseCard from "../components/courseCard";
import HeaderComponent from "../components/HeaderComponent";
import MenuComponent from "../components/MenuComponent";
import axios from "axios";
// import COURSE1 from "../../assets/img/courses/PBS-cursos-01.png";
// import COURSE2 from "../../assets/img/courses/PBS-cursos-02.png";
// import COURSE3 from "../../assets/img/courses/PBS-cursos-03.png";
// import COURSE4 from "../../assets/img/courses/PBS-cursos-04.png";
// import COURSE5 from "../../assets/img/courses/PBS-cursos-05.png";
// import COURSE6 from "../../assets/img/courses/PBS-cursos-06.png";
import "./styles.css"

const Home = () => {
    const [modules, setModules] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getDataModules = async () => {
        try {
            const request = await axios.get("http://localhost:4500/quiz/v1/quiz");
            setModules(request.data)
            setIsLoading(false)
        } catch (error) {
            console.log("[ GET MODEULES ERROR ]", error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getDataModules()
    }, [])

    return (
        <main>
            <HeaderComponent />
            <MenuComponent />
            <div className="container">
                <div className="row">
                    {
                        isLoading ? (
                            <div className="d-flex justify-content-center py-5">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            modules.length > 0 ? (
                                modules.map((item, index) => <CourseCard key={index} item={item} />)
                            ) : (
                                <div className="d-flex justify-content-center py-5">
                                    <h3 className="text-muted fst-italic">No se encontraron módulos</h3>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </main>
    );
}

export default Home;