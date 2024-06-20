interface GenderCheckBoxProps {
    onCheckboxChange: (gender: string) => void;
    selectedGender: string;
}

const GenderCheckBox: React.FC<GenderCheckBoxProps> = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className="flex justify-around">
            <div className="flex items-center gap-1">
                <span>Male</span>
                <input type="checkbox" className="checkbox" checked={selectedGender === "male"}
                onChange={() => onCheckboxChange("male")}/>
            </div>
            <div className="flex items-center gap-1">
                <span>Female</span>
                <input type="checkbox" className="checkbox" checked={selectedGender === "female"}
                onChange={() => onCheckboxChange("female")}/>
            </div>
        </div>
    )
}

export default GenderCheckBox