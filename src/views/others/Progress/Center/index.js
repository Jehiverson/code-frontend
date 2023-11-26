import Accordion from "../../../components/Accordion";
import HeaderComponent from "../../../components/HeaderComponent";
import MenuComponent from "../../../components/MenuComponent";
import ChartComponent from "./components/ChartComponent";

const _AGENCIAS = [
  {name: "Centro - Centro", serie: [400]},
  {name: "Centro - Norte", serie: [350]},
  {name: "Centro - Sor", serie: [200]},
  {name: "Centro - Occidente", serie: [500]},
  {name: "Cuentas Clave", serie: [100]},
]

const ProgressCenter = () => {

  const RenderContent = () => {
    return (
      <div className="m-3">
        {
          _AGENCIAS.map((item, index) => (
            <div key={`ACR-${index}`} className="m-3">
              <Accordion
                title={item.name}
                content={<ChartComponent name={item.name} serie={item.serie} />}
              />
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div>
      <HeaderComponent />
      <MenuComponent />
      <div className="container">
        <Accordion
          title={"Datos por Centro"}
          content={<div className="conatiner border"><RenderContent /></div>}
        />
      </div>
      <div className="container d-flex justify-content-center mb-5">
        <button
          type="button"
          style={{ backgroundColor: "#810000", borderColor: "#810000", paddingInline: "5%" }}
          className="btn btn-primary btn-md mt-4 rounded-pill"
        >
          <b>{"Ver Datos por Divisiones"}</b>
        </button>
      </div>
    </div>
  )
}

export default ProgressCenter;