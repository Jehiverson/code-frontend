import DataTable from 'react-data-table-component';
import HeaderComponent from '../../../../components/HeaderComponent';
import MenuComponent from '../../../../components/MenuComponent';

import "./tableStyle.css";
import { useState } from 'react';
import { getDataGeneralAdvances } from '../../../../services/dashboardFnc';
import { useEffect } from 'react';

const GeneralAdvance = () => {
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'id',
      selector: row => row.idUser,
    },
    {
      name: 'Usuario',
      selector: row => row.user,
    },
    {
      name: 'DPI',
      selector: row => row?.dpi || "N/A",
    },
    {
      name: 'División',
      selector: row => row?.Agency?.Area?.Division.name || "N/A",
    },
    {
      name: 'Agencia',
      selector: row => row?.Agency.name || "N/A",
    },
    {
      name: 'Centro',
      selector: row => row?.Agency?.Area.name || "N/A",
    },
  ];

  const getData = async () => {
    try {
      const request = await getDataGeneralAdvances()
      if (request?.data) {
        setData(request.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ExpandedComponent = ({data}) => {
    return(
      <div className='container'>
        <div className='row'>
          {
            data.UserQuiz.length > 0 ? (
              (data.UserQuiz.some(q => q.aproved === 1)) ? (
                data.UserQuiz.map((quiz, index) => {
                  if (quiz.aproved === 1) {
                    return (
                      <div key={`MOD-${data.user}-${index}`} className='col-lg-3 col-md-6 col-sm-12 my-2'>
                        <div className='card'>
                          <div className='card-body'>
                            <div className='text-center'>
                              <h6><span className='fw-bold'>{quiz.Quiz.title}</span></h6>
                              <h5>{(quiz?.UserScoreQuiz?.score * 10) || 80}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              ) : (
                <div className='text-center my-5'>
                  <h6 className='text-muted'>{`${data.user} no tiene ningún módulo aprovado`}</h6>
                </div>
              )
            ) : (
              <div className='text-center my-5'>
                <h6 className='text-muted'>{`${data.user} no ha realizado ningún custionario`}</h6>
              </div>
            )
          }
        </div>
      </div>
    )
  }

  useEffect(() => {
    getData()
  }, [])


  const customStyles = {
    table: {
    },
  };

  return (
    <div>
      <HeaderComponent />
      <MenuComponent />
      <div className="container">
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            data={data}
            columns={columns}
            noDataComponent={<div className='text-center'>{"cargando..."}</div>}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  )
}

export default GeneralAdvance;