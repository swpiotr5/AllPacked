import picture from '../../assets/man2.png';
import imgdecor from '../../assets/decor2.png'

const LeftSideContainer = ({ children }) => {
    return (
        <div className='relative w-full h-full flex justify-center items-center'>
            <img src={picture} alt="Description" className="absolute bottom-0 w-full object-cover opacity-30" />
            <img src={imgdecor} alt="Description" className="absolute top-0 left-0 w-full opacity-5 object-cover" />
        </div>
    );
};

export default LeftSideContainer;