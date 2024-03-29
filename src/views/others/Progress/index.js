import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import MenuComponent from "../../components/MenuComponent";

const ProgressIndex = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderComponent />
      <MenuComponent />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 my-4">
            <div style={{ height: 300 }} className="card shadow-lg px-3 mb-3 bg-body rounded-4 d-flex justify-content-around">
              <img src={"https://res.cloudinary.com/dwjgahuls/image/upload/v1699646077/CBC/yubuvzzhpjnfsvbwpxdu.png"} className="card-img-top" alt="..." />
              <button type="button" onClick={() => navigate(`/avances/general`)} className="btn btn-view-presentation btn-md px-5 rounded-pill">Ver</button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 my-4">
            <div style={{ height: 300 }} className="card shadow-lg px-3 mb-3 bg-body rounded-4 d-flex justify-content-around">
              <img src={"https://res.cloudinary.com/dwjgahuls/image/upload/v1699646077/CBC/nzphgsy3iso2i2kamend.png"} className="card-img-top" alt="..." />
              <button type="button" onClick={() => navigate(`/avances/centro`)} className="btn btn-view-presentation btn-md px-5 rounded-pill">Ver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressIndex;