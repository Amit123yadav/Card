import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCards } from '../store/cardSlice'
const Card = () => {
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch()
    const data = useSelector((state) => state.card.data)
    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchCards())
            setLoading(true)
        }, 5000)
    }, [])
    const handleNext = () => {
            setCurrentPage((pre) => pre + 1 >=1)
    }
    const handlPre = () => {
        setCurrentPage((pre) => pre - 1 >= 0)
    }
    console.log(currentPage)

    return (
        <div>
            <div style={{ width: '200px', height: '200px' }} className="card">
                <div className="card-body">
                    <h5 className="card-title">Card toggle</h5>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span onClick={() => setToggle(false)} style={{ fontSize: '20px' , cursor :'pointer' }}>🔃</span>
                        <span onClick={() => setToggle(true)} style={{ fontSize: '20px' , cursor : 'pointer' }}>🔃</span>
                    </div>
                </div>
            </div>
            <div>
                <CardContent loading={loading} data={data} currentPage={currentPage} toggle={toggle} />
                <button onClick={() => handleNext()}>Next</button>
                <button onClick={() => handlPre()}>previous</button>
            </div>


        </div>

    )
}



export default Card;


const CardContent = ({ data, loading, currentPage  ,toggle}) => {

    const filteredData = data.slice(
        (currentPage - 1) * 6,
        currentPage * 6
    )


    return (
        <div>
            {
                !loading ? <h3>Loading ...</h3> :
                    toggle ? filteredData?.map((el) => {
                        return (
                            <div className='w-75 d-flex'>
                                <div className="card w-75 m-3" >
                                    <div className="card-body">
                                        <h5 className="card-title">{el.title}</h5>
                                        <p className="card-text">{el.body}</p>
                                    </div>
                                </div>
                                <button className='btn btn-outline-danger' style={{ width: '35px', height: '35px', marginTop: '1rem' }} >X</button>
                            </div>
                        )
                    })
                        :
                        filteredData?.map((el) => {
                            return (
                                <div class="card">
                                    <div class="card-body">
                                        <h5 className="card-title">{el.title}</h5>
                                        <p className="card-text">{el.body}</p>
                                    </div>
                                </div>
                            )
                        })

            }
        </div>
    )
}