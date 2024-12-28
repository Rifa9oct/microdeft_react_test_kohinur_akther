import logo from "../assets/logo.png"

const Header = () => {
    return (
        <div className="absolute flex gap-2 items-center my-12 ml-28">
            <img src={logo} alt="logo" className="w-[50px]" />
            <p className="logotextStyle text-2xl text-white font-[750]">Dev Academy</p>
        </div>
    );
};

export default Header;