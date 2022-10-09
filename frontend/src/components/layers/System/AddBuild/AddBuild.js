import mine from '../../../../assets/mine_0.png'
import forest from '../../../../assets/forest_0.png'
import village from '../../../../assets/village_0.png'
import warehouse from '../../../../assets/warehouse_0.png'
import farm from '../../../../assets/farm_0.png'


import './AddBuild.css'

function AddBuild(props) {

    const items = [
        {
            id: 0,
            name: 'Ферма',
            cost: '10',
            img: farm
        },
        {
            id: 0,
            name: 'Шахта',
            cost: '10',
            img: mine
        },
        {
            id: 0,
            name: 'Пилорама',
            cost: '10',
            img: warehouse
        },
        {
            id: 0,
            name: 'Деревня',
            cost: '10',
            img: village
        },
    ]

    return (
        <div
            className="modal"
            onClick={
                (e) => {
                    if (e.target.className == 'modal') {
                        props.toggler()
                    }
                }
            }
        >
            <div
                className="modal-content"

            >
                <h3>Постройка здания</h3>
                <div className='items'>
                    {
                        items.map(
                            (value, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='item'
                                    >
                                        <img src={value.img} />
                                        <h4>{value.name}</h4>
                                        <p>{value.cost} монет</p>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AddBuild 