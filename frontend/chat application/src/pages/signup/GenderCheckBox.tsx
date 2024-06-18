const GenderCheckBox = () =>{
    return (
        <div className="flex justify-around">
            <div className="flex items-center gap-1">
                <span>Male</span>
                <input type="checkbox" className="checkbox" />
            </div>
            <div className="flex items-center gap-1">
                <span>Female</span>
                <input type="checkbox" className="checkbox" />
            </div>
        </div>
    )

}

export default GenderCheckBox