import { useEffect, useState } from "react";
import Accordion from "../../../components/Accordion";
import HeaderComponent from "../../../components/HeaderComponent";
import MenuComponent from "../../../components/MenuComponent";
import ResultsQuiz from "./components/ResultsQuiz";
import TotalRegistered from "./components/TotalRegistered";

import "../styles.css";
import { getGeneralDataInscriptionService } from "../../../services/dashboardFnc";
const _DIVISION = [
  {name: "Agua Pura", aprobados: 5, reprobados: 10},
  {name: "Bebidas Carbonatadas", aprobados: 100, reprobados: 10},
  {name: "RTD's", aprobados: 50, reprobados: 10},
  {name: "Cerveza", aprobados: 40, reprobados: 35},
  {name: "El Zapote", aprobados: 100, reprobados: 1},
]

const _DIVISION_CENTRO = [
  {name: "Agua Pura", series: [{
    data: [{
      x: 'Aprobados ',
      y: 5
    }, {
      x: 'Total Usuarios Reprobados',
      y: 10
    }]
  }]},
  {name: "Bebidas Carbonatadas", aprobados: 100, reprobados: 10},
  {name: "RTD's", aprobados: 50, reprobados: 10},
  {name: "Cerveza", aprobados: 40, reprobados: 35},
  {name: "El Zapote", aprobados: 100, reprobados: 1},
]
const ProgressGeneral = () => {
  const [active, setActive] = useState(0)
  const [data, setData] = useState(null)
  const RenderContent = () => (
    <div className="container border">
      <Accordion title={"Total Inscritos"} content={<TotalRegistered data={data} />} />
      <Accordion title={"Totales Aprobados / Reprobados"} content={<ResultsQuiz title={"Totales Aprobados / Reprobados"} aprobados={data?.aproved || 0} reprobados={data?.reproved || 0} />} />
    </div>
  )

  const getData = async () => {
    try {
      const data = await getGeneralDataInscriptionService()
      setData(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (active === 1) {

    } else if (active === 2) {

    } else {
      getData()
    }
  }, [active])

  return (
    <div>
      <HeaderComponent />
      <MenuComponent />
      <div className="container">
        <Accordion
          title={"Datos Generales"}
          content={<RenderContent />}
        />
        <div className="d-flex justify-content-center">
          <div
            onClick={() => setActive(active === 1 ? 0 : 1)}
            className={`btn btn-md m-1 rounded-pill ${active === 1 ? "active-btn":"inactive-btn"}`}
          >{"Ver Datos por División"}</div>
          <div
            onClick={() => setActive(active === 2 ? 0 : 2)}
            className={`btn btn-primary btn-md m-1 rounded-pill ${active === 2 ? "active-btn":"inactive-btn"}`}
          >{"Ver Datos por División : Por Centro"}</div>
        </div>
        <div className="container">
          {
            active !== 0 && (
              active === 1 ? (
                <div className="conatiner my-2 py-2">
                  <div className="row">
                    {
                      _DIVISION.map(item => (
                        <div className="col-lg-6 col-md-6 col-sm-12 my-2">
                          <ResultsQuiz title={`División: ${item.name} - Reporte General`} aprobados={item.aprobados} reprobados={item.reprobados} buttons={false} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              ) : (
                <div className="conatiner border my-2 py-2"></div>
              )
            )
          }
      </div>
      </div>
    </div>
  )
}

export default ProgressGeneral;